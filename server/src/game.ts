import { randomUUID } from 'node:crypto';
import {
  type AdminAction,
  type CategoryView,
  type GameView,
  type MapView,
  type MediaKind,
  type MediaSet,
  type MediaTarget,
  type PlayerView,
  type Playback,
  type Point,
  type Role,
  type RunView,
  type Sfx,
  type Stroke,
  BOARD_COLORS,
  BOARD_WIDTHS,
  DOUBLE_POINTS_AFTER,
  ERASER,
  MAP_HEIGHT,
  MAP_WIDTH,
  MAX_BOARD_TEXT,
  MAX_PLAYERS,
  PLAYER_ICONS,
  TILE_POINTS,
  TIMER_SECONDS,
} from '@quiz/shared';
import type { CategoryDef, QuestionDef } from './catalog.js';

const MAX_STROKES = 2000;
const MAX_POINTS = 5000;
const MAX_NAME = 30;
const ADMIN_MEMBER = 'admin';

export class GameError extends Error {}

interface Player extends PlayerView {
  token: string;
  sockets: number;
  strokes: Stroke[];
  /** Text, der noch getippt wird; wird beim Zeigen der Boards übernommen. */
  draft: Stroke | null;
}

interface Run {
  category: number;
  row: number;
  value: number;
  question: QuestionDef;
  previousTile: Game['lastTile'];
  questionVisible: boolean;
  promptReleased: boolean;
  solutionVisible: boolean;
  pictureVisible: boolean;
  playback: Playback | null;
  readyIds: Set<string>;
  timer: { running: boolean; remainingMs: number; endsAt: number | null };
  frozenIds: Set<string>;
  buzzerOpened: boolean;
  buzzedId: string | null;
  pendingBuzzes: { playerId: string; time: number }[];
  picks: Map<string, Point>;
  goalVisible: boolean;
  boardsVisible: boolean;
  boardsLocked: boolean;
  revealedBoardIds: Set<string>;
}

interface Tile {
  used: boolean;
}

export interface GameEffects {
  sfx?: Sfx;
  /** Boards müssen neu verteilt werden. */
  boardsChanged?: boolean;
  kickedToken?: string;
  /** Eine Wiedergabe wird vorbereitet; der Hub setzt das Zeitlimit. */
  prepareId?: string;
}

export class Game {
  readonly adminToken = randomUUID();
  readonly players: Player[] = [];
  phase: GameView['phase'] = 'lobby';
  activePlayerId: string | null = null;
  run: Run | null = null;
  lastActivity: number;

  lastTile: { category: number; row: number } | null = null;
  private doubled = false;
  private readonly tiles: Tile[][];

  constructor(
    readonly code: string,
    readonly hostName: string,
    private readonly catalog: CategoryDef[],
    private readonly now: () => number = Date.now,
  ) {
    this.tiles = catalog.map((category) => category.questions.map(() => ({ used: false })));
    this.lastActivity = now();
  }

  // --- Teilnehmer -----------------------------------------------------------

  join(rawName: string): Player {
    const name = rawName.trim().slice(0, MAX_NAME);
    if (!name) throw new GameError('Bitte einen Namen eingeben.');
    if (this.phase === 'finished') throw new GameError('Dieses Spiel ist bereits beendet.');

    const existing = this.players.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      // Geräte- oder Browserwechsel: Ein getrennter Spieler übernimmt seinen Platz wieder.
      if (existing.connected) throw new GameError('Dieser Name ist bereits vergeben.');
      return existing;
    }
    if (this.phase !== 'lobby') throw new GameError('Das Spiel läuft bereits.');
    if (this.players.length >= MAX_PLAYERS) throw new GameError('Das Spiel ist voll.');

    const usedIcons = new Set(this.players.map((p) => p.icon));
    const player: Player = {
      id: randomUUID(),
      token: randomUUID(),
      name,
      points: 0,
      icon: PLAYER_ICONS.find((icon) => !usedIcons.has(icon)) ?? PLAYER_ICONS[0]!,
      connected: false,
      jokers: { block: true, double: true },
      sockets: 0,
      strokes: [],
      draft: null,
    };
    this.players.push(player);
    this.activePlayerId ??= player.id;
    this.touch();
    return player;
  }

  findByToken(token: string): { role: Role; player: Player | null } | null {
    if (token === this.adminToken) return { role: 'admin', player: null };
    const player = this.players.find((p) => p.token === token);
    return player ? { role: 'player', player } : null;
  }

  connect(player: Player): void {
    player.sockets += 1;
    player.connected = true;
    this.touch();
  }

  disconnect(player: Player): void {
    player.sockets = Math.max(0, player.sockets - 1);
    player.connected = player.sockets > 0;
    this.touch();
  }

  // --- Admin ----------------------------------------------------------------

  apply(action: AdminAction): GameEffects {
    this.touch();
    switch (action.type) {
      case 'start':
        if (this.phase !== 'lobby') throw new GameError('Das Spiel läuft bereits.');
        if (this.players.length === 0) throw new GameError('Es ist noch kein Spieler beigetreten.');
        this.phase = 'board';
        return {};
      case 'finish':
        this.run = null;
        this.phase = 'finished';
        return {};
      case 'kick':
        return this.kick(action.playerId);
      case 'setActive':
        this.activePlayerId = this.player(action.playerId).id;
        return {};
      case 'points':
        this.player(action.playerId).points += finite(action.delta);
        return {};
      case 'resetPoints':
        this.player(action.playerId).points = 0;
        return {};
      case 'toggleJoker': {
        const { jokers } = this.player(action.playerId);
        jokers[action.joker] = !jokers[action.joker];
        return {};
      }
      case 'openQuestion':
        return this.openQuestion(action.category, action.row);
      case 'closeQuestion':
        return this.closeQuestion();
      case 'showQuestion': {
        const run = this.requireRun();
        run.questionVisible = true;
        return {};
      }
      case 'releasePrompt': {
        const run = this.requireRun();
        run.promptReleased = true;
        this.openBuzzer(run);
        return {};
      }
      case 'showSolution': {
        const run = this.requireRun();
        run.solutionVisible = true;
        run.promptReleased = true;
        run.boardsVisible = false;
        run.playback = null;
        return {};
      }
      case 'togglePicture': {
        const run = this.requireRun();
        run.pictureVisible = !run.pictureVisible;
        if (run.pictureVisible) this.openBuzzer(run);
        return {};
      }
      case 'timerStart':
        return this.timerStart();
      case 'timerPause':
        return this.timerPause();
      case 'timerReset': {
        const run = this.requireRun();
        run.timer = freshTimer();
        return {};
      }
      case 'buzzerRelease': {
        const run = this.requireRun();
        run.buzzerOpened = true;
        run.frozenIds.clear();
        run.buzzedId = null;
        run.pendingBuzzes = [];
        return {};
      }
      case 'buzzerFreezeAll': {
        const run = this.requireRun();
        run.frozenIds = new Set(this.players.map((p) => p.id));
        run.buzzedId = null;
        run.pendingBuzzes = [];
        return {};
      }
      case 'buzzerFreezeBuzzed': {
        const run = this.requireRun();
        if (run.buzzedId) run.frozenIds.add(run.buzzedId);
        run.buzzedId = null;
        run.pendingBuzzes = [];
        return {};
      }
      case 'showBoards': {
        const run = this.requireRun();
        run.boardsVisible = true;
        run.boardsLocked = true;
        run.playback = null;
        // Wer vergessen hat, Enter zu drücken, verliert seine Antwort nicht.
        for (const player of this.players) {
          if (player.draft) player.strokes.push(player.draft);
          player.draft = null;
        }
        return { boardsChanged: true };
      }
      case 'hideBoards': {
        const run = this.requireRun();
        run.boardsVisible = false;
        // Solange nichts aufgedeckt ist, war es nur ein Blick: Die Spieler zeichnen weiter.
        run.boardsLocked = run.revealedBoardIds.size > 0;
        return {};
      }
      case 'revealBoard':
        this.requireRun().revealedBoardIds.add(this.player(action.playerId).id);
        return { boardsChanged: true };
      case 'mapShowDistances':
        this.requireRun().goalVisible = true;
        return {};
      case 'mediaPlay':
        return this.mediaPlay(action.target, action.kind, action.positionSec);
      case 'mediaPause': {
        const run = this.requireRun();
        if (run.playback) {
          run.playback = { ...run.playback, preparing: false, playing: false, positionSec: this.position(run.playback), updatedAt: this.now() };
        }
        return {};
      }
      case 'mediaEnded':
        this.requireRun().playback = null;
        return {};
      case 'mediaSeek': {
        const run = this.requireRun();
        if (run.playback && !run.playback.preparing) {
          run.playback = { ...run.playback, positionSec: Math.max(0, finite(action.positionSec)), updatedAt: this.now() };
        }
        return {};
      }
      default:
        throw new GameError('Unbekannte Aktion.');
    }
  }

  private kick(playerId: string): GameEffects {
    const player = this.player(playerId);
    this.players.splice(this.players.indexOf(player), 1);
    if (this.activePlayerId === playerId) this.activePlayerId = this.players[0]?.id ?? null;
    if (this.run) {
      this.run.frozenIds.delete(playerId);
      this.run.picks.delete(playerId);
      this.run.revealedBoardIds.delete(playerId);
      this.run.pendingBuzzes = this.run.pendingBuzzes.filter((buzz) => buzz.playerId !== playerId);
      if (this.run.buzzedId === playerId) this.run.buzzedId = null;
    }
    return { kickedToken: player.token };
  }

  private openQuestion(category: number, row: number): GameEffects {
    // Ein Doppelklick auf die Kachel darf die offene Frage nicht stören.
    if (this.phase === 'question') return {};
    if (this.phase !== 'board') throw new GameError('Gerade kann keine Frage geöffnet werden.');
    const question = this.catalog[category]?.questions[row];
    if (!question) throw new GameError('Diese Frage gibt es nicht.');

    const previousTile = this.lastTile;
    this.lastTile = { category, row };
    for (const player of this.players) {
      player.strokes = [];
      player.draft = null;
    }
    this.run = {
      category,
      row,
      value: this.tileValue(row),
      question,
      previousTile,
      questionVisible: false,
      promptReleased: false,
      solutionVisible: false,
      pictureVisible: false,
      playback: null,
      readyIds: new Set(),
      timer: freshTimer(),
      frozenIds: new Set(this.players.map((p) => p.id)),
      buzzerOpened: false,
      buzzedId: null,
      pendingBuzzes: [],
      picks: new Map(),
      goalVisible: false,
      boardsVisible: false,
      boardsLocked: false,
      revealedBoardIds: new Set(),
    };
    this.phase = 'question';
    return { boardsChanged: true, sfx: question.bonus ? 'bonus' : undefined };
  }

  private closeQuestion(): GameEffects {
    const run = this.run;
    if (!run) return {};
    this.run = null;
    this.phase = 'board';

    // Noch nichts gesehen: Das war ein Verklicken und keine gespielte Frage.
    if (!run.questionVisible || this.promptPending(run)) {
      this.lastTile = run.previousTile;
      return {};
    }

    this.tiles[run.category]![run.row]!.used = true;
    this.advanceActivePlayer();

    if (!this.doubled && this.playedCount() >= DOUBLE_POINTS_AFTER) {
      this.doubled = true;
      return { sfx: 'bonus' };
    }
    return {};
  }

  /** Reine Textfrage beim Buzzer, die der Admin noch nicht freigegeben hat. */
  private promptPending(run: Run): boolean {
    const { image, video, audio } = run.question.media ?? {};
    const textOnly = run.question.mode === 'buzzer' && !image && !video && !audio;
    return run.questionVisible && textOnly && !run.promptReleased;
  }

  private advanceActivePlayer(): void {
    if (this.players.length === 0) return;
    const current = this.players.findIndex((p) => p.id === this.activePlayerId);
    this.activePlayerId = this.players[(current + 1) % this.players.length]!.id;
  }

  private timerStart(): GameEffects {
    const { timer } = this.requireRun();
    if (!timer.running && timer.remainingMs > 0) {
      timer.running = true;
      timer.endsAt = this.now() + timer.remainingMs;
    }
    return {};
  }

  private timerPause(): GameEffects {
    const { timer } = this.requireRun();
    if (timer.running && timer.endsAt !== null) {
      timer.remainingMs = Math.max(0, timer.endsAt - this.now());
      timer.running = false;
      timer.endsAt = null;
    }
    return {};
  }

  private mediaPlay(target: MediaTarget, kind: MediaKind, positionSec = 0): GameEffects {
    const run = this.requireRun();
    if (kind !== 'video' && kind !== 'audio') throw new GameError('Ungültiges Medium.');
    const set = target === 'question' ? run.question.media : run.question.answer;
    if (!set?.[kind]) throw new GameError('Dieses Medium gibt es hier nicht.');
    if (target === 'question' ? !run.questionVisible : !run.solutionVisible) {
      throw new GameError('Das Medium ist noch nicht aufgedeckt.');
    }
    const id = randomUUID();
    run.readyIds = new Set();
    run.playback = {
      id,
      target,
      kind,
      preparing: true,
      readyCount: 0,
      expectedCount: 0,
      playing: false,
      positionSec: Math.max(0, finite(positionSec)),
      updatedAt: this.now(),
    };
    return { prepareId: id };
  }

  /** Meldet, dass ein Client fertig gepuffert hat; true, wenn dadurch alle bereit sind. */
  mediaReady(memberId: string, id: string): boolean {
    const run = this.run;
    if (!run?.playback?.preparing || run.playback.id !== id) return false;
    run.readyIds.add(memberId);
    if (this.expectedMembers().some((member) => !run.readyIds.has(member))) return false;
    return this.startPlayback(id);
  }

  /** Startet die vorbereitete Wiedergabe; auch das Zeitlimit des Hubs landet hier. */
  startPlayback(id: string): boolean {
    const run = this.run;
    if (!run?.playback?.preparing || run.playback.id !== id) return false;
    run.playback = { ...run.playback, preparing: false, playing: true, updatedAt: this.now() };
    if (run.playback.target === 'question') this.openBuzzer(run);
    return true;
  }

  private expectedMembers(): string[] {
    return [ADMIN_MEMBER, ...this.players.filter((p) => p.connected).map((p) => p.id)];
  }

  /** Einmalig öffnen, sobald die Spieler die Frage kennen; danach entscheidet der Admin. */
  private openBuzzer(run: Run): void {
    if (run.question.mode !== 'buzzer' || run.buzzerOpened) return;
    run.buzzerOpened = true;
    run.frozenIds.clear();
  }

  private position(playback: Playback): number {
    if (!playback.playing) return playback.positionSec;
    return playback.positionSec + (this.now() - playback.updatedAt) / 1000;
  }

  // --- Spieler --------------------------------------------------------------

  /** Registriert einen Buzz; true heißt: Dies ist der erste, die Auswertung muss geplant werden. */
  buzz(playerId: string, latencyMs: number): boolean {
    const run = this.run;
    if (!run || run.question.mode !== 'buzzer' || !run.questionVisible) return false;
    if (run.buzzedId || run.frozenIds.has(playerId)) return false;
    if (run.pendingBuzzes.some((b) => b.playerId === playerId)) return false;
    run.pendingBuzzes.push({ playerId, time: this.now() - latencyMs });
    return run.pendingBuzzes.length === 1;
  }

  /** Wählt nach dem Latenzfenster den wirklich schnellsten Buzz aus. */
  resolveBuzz(): GameEffects {
    const run = this.run;
    if (!run || run.buzzedId || run.pendingBuzzes.length === 0) return {};
    const [first] = [...run.pendingBuzzes].sort((a, b) => a.time - b.time);
    run.buzzedId = first!.playerId;
    run.pendingBuzzes = [];
    return { sfx: 'buzz' };
  }

  mapPick(playerId: string, point: Point): void {
    const run = this.run;
    if (!run || run.question.mode !== 'map' || !run.questionVisible || run.goalVisible) return;
    if (!isUnit(point?.x) || !isUnit(point?.y)) return;
    run.picks.set(playerId, { x: point.x, y: point.y });
  }

  addStroke(player: Player, stroke: Stroke): boolean {
    if (!this.canDraw() || !validStroke(stroke) || player.strokes.length >= MAX_STROKES) return false;
    player.strokes.push(cleanStroke(stroke));
    if (stroke.text) player.draft = null;
    return true;
  }

  setDraft(player: Player, stroke: Stroke | null): boolean {
    if (!this.canDraw()) return false;
    if (stroke === null) {
      player.draft = null;
      return true;
    }
    if (!validStroke(stroke) || !stroke.text) return false;
    player.draft = cleanStroke(stroke);
    return true;
  }

  undoStroke(player: Player): boolean {
    if (!this.canDraw()) return false;
    return player.strokes.pop() !== undefined;
  }

  clearStrokes(player: Player): boolean {
    if (!this.canDraw()) return false;
    player.strokes = [];
    return true;
  }

  private canDraw(): boolean {
    const run = this.run;
    return !!run && run.question.mode === 'whiteboard' && run.questionVisible && !run.boardsLocked;
  }

  // --- Ansichten ------------------------------------------------------------

  /** Boards, die dieser Teilnehmer sehen darf: das eigene und alle aufgedeckten. */
  visibleBoards(viewer: Player | null): Record<string, Stroke[]> {
    const boards: Record<string, Stroke[]> = {};
    for (const player of this.players) {
      if (player === viewer || this.run?.revealedBoardIds.has(player.id)) boards[player.id] = player.strokes;
    }
    return boards;
  }

  view(role: Role, viewer: Player | null): GameView {
    return {
      code: this.code,
      role,
      selfId: viewer?.id ?? null,
      hostName: this.hostName,
      phase: this.phase,
      serverNow: this.now(),
      players: this.players.map(({ id, name, points, icon, connected, jokers }) => ({ id, name, points, icon, connected, jokers })),
      activePlayerId: this.activePlayerId,
      categories: this.categoryViews(),
      playedCount: this.playedCount(),
      doubled: this.doubled,
      lastTile: this.lastTile,
      run: this.run ? this.runView(this.run, role, viewer) : null,
    };
  }

  private categoryViews(): CategoryView[] {
    return this.catalog.map((category, c) => ({
      name: category.name,
      image: category.image,
      tiles: category.questions.map((question, r) => {
        const { used } = this.tiles[c]![r]!;
        return { used, value: this.tileValue(r), bonus: used && !!question.bonus };
      }),
    }));
  }

  private runView(run: Run, role: Role, viewer: Player | null): RunView {
    const { question } = run;
    const isMap = question.mode === 'map';
    const gated = isMap || question.mode === 'buzzer';
    const media: MediaSet = run.questionVisible ? { ...question.media } : {};
    if (gated && !run.pictureVisible) delete media.image;
    const promptPending = this.promptPending(run);
    const playback = run.playback && {
      ...run.playback,
      readyCount: run.readyIds.size,
      expectedCount: this.expectedMembers().length,
    };

    return {
      category: run.category,
      row: run.row,
      value: run.value,
      mode: question.mode,
      bonus: !!question.bonus,
      questionVisible: run.questionVisible,
      prompt: run.questionVisible && !promptPending ? question.prompt : null,
      promptPending,
      options: run.questionVisible ? (question.options ?? []) : [],
      media,
      solutionVisible: run.solutionVisible,
      answer: run.solutionVisible ? question.answer : null,
      playback,
      timer: { ...run.timer },
      buzzer: question.mode === 'buzzer' ? { frozenIds: [...run.frozenIds], buzzedId: run.buzzedId } : null,
      map: isMap && run.questionVisible ? this.mapView(run, role, viewer) : null,
      hasPicture: run.questionVisible && gated && !!question.media?.image,
      pictureVisible: run.pictureVisible,
      boardsVisible: run.boardsVisible,
      boardsLocked: run.boardsLocked,
      revealedBoardIds: [...run.revealedBoardIds],
      boardImages: run.questionVisible ? this.boardImages(run, viewer) : {},
    };
  }

  private boardImages(run: Run, viewer: Player | null): Record<string, string> {
    const images: Record<string, string> = {};
    this.players.forEach((player, slot) => {
      if (player !== viewer && !run.revealedBoardIds.has(player.id)) return;
      const { boardImage, imposter } = run.question;
      const image = imposter?.slot === slot ? imposter.boardImage : boardImage;
      if (image) images[player.id] = image;
    });
    return images;
  }

  private mapView(run: Run, role: Role, viewer: Player | null): MapView {
    const def = run.question.map!;
    const goal = { x: def.goal.x / MAP_WIDTH, y: def.goal.y / MAP_HEIGHT };
    return {
      image: def.image,
      submittedIds: [...run.picks.keys()],
      myPick: (viewer && run.picks.get(viewer.id)) ?? null,
      picks: role === 'admin' || run.goalVisible ? Object.fromEntries(run.picks) : null,
      goal: run.goalVisible ? goal : null,
      distances: run.goalVisible
        ? Object.fromEntries([...run.picks].map(([id, pick]) => [id, pixelDistance(pick, goal)]))
        : null,
    };
  }

  private tileValue(row: number): number {
    const base = TILE_POINTS[row] ?? 0;
    return this.doubled ? base * 2 : base;
  }

  private playedCount(): number {
    return this.tiles.flat().filter((tile) => tile.used).length;
  }

  private player(id: string): Player {
    const player = this.players.find((p) => p.id === id);
    if (!player) throw new GameError('Spieler nicht gefunden.');
    return player;
  }

  private requireRun(): Run {
    if (!this.run) throw new GameError('Es ist gerade keine Frage offen.');
    return this.run;
  }

  private touch(): void {
    this.lastActivity = this.now();
  }
}

function freshTimer(): Run['timer'] {
  return { running: false, remainingMs: TIMER_SECONDS * 1000, endsAt: null };
}

function finite(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new GameError('Ungültiger Wert.');
  return value;
}

function isUnit(value: unknown): value is number {
  return typeof value === 'number' && value >= 0 && value <= 1;
}

function validStroke(stroke: Stroke): boolean {
  return (
    !!stroke &&
    (BOARD_COLORS.includes(stroke.color) || stroke.color === ERASER) &&
    BOARD_WIDTHS.includes(stroke.width) &&
    Array.isArray(stroke.points) &&
    stroke.points.length > 0 &&
    stroke.points.length <= MAX_POINTS &&
    stroke.points.every((p) => isUnit(p?.x) && isUnit(p?.y)) &&
    validText(stroke)
  );
}

function validText({ text, points, color }: Stroke): boolean {
  if (text === undefined) return true;
  return typeof text === 'string' && text.length > 0 && text.length <= MAX_BOARD_TEXT && points.length === 1 && color !== ERASER;
}

function cleanStroke(stroke: Stroke): Stroke {
  return {
    id: String(stroke.id),
    color: stroke.color,
    width: stroke.width,
    points: stroke.points.map(({ x, y }) => ({ x, y })),
    ...(stroke.text ? { text: stroke.text } : {}),
  };
}

function pixelDistance(a: Point, b: Point): number {
  return Math.round(Math.hypot((a.x - b.x) * MAP_WIDTH, (a.y - b.y) * MAP_HEIGHT));
}
