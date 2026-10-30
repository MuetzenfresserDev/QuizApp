/** Gemeinsame Typen von Server und Web-Client. */

export const MAX_PLAYERS = 4;
export const TILE_POINTS = [100, 200, 300, 400, 500];
/** Ab so vielen gespielten Fragen zählen alle offenen Kacheln doppelt. */
export const DOUBLE_POINTS_AFTER = 10;
export const TIMER_SECONDS = 30;
export const PLAYER_ICONS = ['Diego.png', 'Lester.png', 'Milten.png', 'Gorn.png'];

/** Referenzgröße der alten Geo-Karte; Pixel-Abstände bleiben dadurch vergleichbar. */
export const MAP_WIDTH = 850;
export const MAP_HEIGHT = 592;

export const BOARD_COLORS = ['#111111', '#ffffff', '#d43b2f', '#2e9e4f', '#2f6fd4', '#e8b923', '#a044c9'];
export const BOARD_WIDTHS = [0.004, 0.008, 0.016];
export const ERASER = 'eraser';

export type QuestionMode = 'buzzer' | 'whiteboard' | 'map';

export interface MediaSet {
  text?: string;
  image?: string;
  video?: string;
  audio?: string;
}

/** Position relativ zur Fläche, jeweils 0..1. */
export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  color: string;
  width: number;
  points: Point[];
}

export interface PlayerView {
  id: string;
  name: string;
  points: number;
  icon: string;
  connected: boolean;
  jokers: { block: boolean; double: boolean };
}

export type MediaTarget = 'question' | 'answer';
export type MediaKind = 'video' | 'audio';

export interface Playback {
  target: MediaTarget;
  kind: MediaKind;
  playing: boolean;
  positionSec: number;
  /** Serverzeit, zu der positionSec galt. */
  updatedAt: number;
}

export interface TimerView {
  running: boolean;
  remainingMs: number;
  /** Serverzeit des Ablaufs, solange der Timer läuft. */
  endsAt: number | null;
}

export interface BuzzerView {
  frozenIds: string[];
  buzzedId: string | null;
}

export interface MapView {
  image: string;
  submittedIds: string[];
  myPick: Point | null;
  /** Erst nach "Spieler anzeigen" gefüllt. */
  picks: Record<string, Point> | null;
  /** Erst nach "Entfernungen zeigen" gefüllt. */
  goal: Point | null;
  distances: Record<string, number> | null;
}

export interface RunView {
  category: number;
  row: number;
  value: number;
  mode: QuestionMode;
  bonus: boolean;
  questionVisible: boolean;
  /** Nur gefüllt, wenn questionVisible. */
  prompt: string | null;
  options: string[];
  /** Nur gefüllt, wenn questionVisible; das Suchbild der Karte zusätzlich erst nach Freigabe. */
  media: MediaSet;
  solutionVisible: boolean;
  /** Nur gefüllt, wenn solutionVisible. */
  answer: MediaSet | null;
  playback: Playback | null;
  timer: TimerView;
  buzzer: BuzzerView | null;
  map: MapView | null;
  pictureVisible: boolean;
  boardsVisible: boolean;
  boardsLocked: boolean;
  revealedBoardIds: string[];
  /** Hintergrund pro Spieler: eigener sofort, fremde erst nach Aufdecken. */
  boardImages: Record<string, string>;
}

export interface TileView {
  value: number;
  used: boolean;
  /** Erst nach dem Spielen sichtbar, damit das Board nichts verrät. */
  bonus: boolean;
}

export interface CategoryView {
  name: string;
  image: string;
  tiles: TileView[];
}

export type Phase = 'lobby' | 'board' | 'question' | 'finished';
export type Role = 'admin' | 'player';

export interface GameView {
  code: string;
  role: Role;
  selfId: string | null;
  hostName: string;
  phase: Phase;
  serverNow: number;
  players: PlayerView[];
  activePlayerId: string | null;
  categories: CategoryView[];
  playedCount: number;
  doubled: boolean;
  lastTile: { category: number; row: number } | null;
  run: RunView | null;
}

export type AdminAction =
  | { type: 'start' }
  | { type: 'finish' }
  | { type: 'kick'; playerId: string }
  | { type: 'setActive'; playerId: string }
  | { type: 'points'; playerId: string; delta: number }
  | { type: 'resetPoints'; playerId: string }
  | { type: 'toggleJoker'; playerId: string; joker: 'block' | 'double' }
  | { type: 'openQuestion'; category: number; row: number }
  | { type: 'closeQuestion' }
  | { type: 'showQuestion' }
  | { type: 'showSolution' }
  | { type: 'togglePicture' }
  | { type: 'timerStart' }
  | { type: 'timerPause' }
  | { type: 'timerReset' }
  | { type: 'buzzerRelease' }
  | { type: 'buzzerFreezeAll' }
  | { type: 'buzzerFreezeBuzzed' }
  | { type: 'showBoards' }
  | { type: 'hideBoards' }
  | { type: 'revealBoard'; playerId: string }
  | { type: 'mapShowPlayers' }
  | { type: 'mapShowDistances' }
  | { type: 'mediaPlay'; target: MediaTarget; kind: MediaKind; positionSec?: number }
  | { type: 'mediaPause' }
  | { type: 'mediaSeek'; positionSec: number };

export type Sfx = 'bonus' | 'buzz';

export type Ack<T = object> = ({ ok: true } & T) | { ok: false; error: string };

export interface Session {
  code: string;
  token: string;
}

export interface ClientToServer {
  create(input: { hostName: string; password: string }, ack: (result: Ack<Session>) => void): void;
  join(input: { code: string; name: string }, ack: (result: Ack<Session>) => void): void;
  resume(input: Session, ack: (result: Ack) => void): void;
  act(action: AdminAction, ack: (result: Ack) => void): void;
  buzz(): void;
  mapPick(point: Point): void;
  boardStroke(stroke: Stroke): void;
  boardUndo(): void;
  boardClear(): void;
}

export interface ServerToClient {
  state(view: GameView): void;
  sfx(name: Sfx): void;
  /** Vollständige Strokes der Boards, die dieser Client sehen darf. */
  boards(boards: Record<string, Stroke[]>): void;
  measure(ack: () => void): void;
  closed(reason: string): void;
}

/** Normalisiert alle üblichen YouTube-URLs auf die Video-ID. */
export function youtubeId(url: string): string | null {
  const match = url.match(/(?:embed\/|watch\?v=|youtu\.be\/)([\w-]{6,})/);
  return match?.[1] ?? null;
}
