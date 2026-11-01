import { randomInt, timingSafeEqual } from 'node:crypto';
import type { Server, Socket } from 'socket.io';
import type { Ack, ClientToServer, GameView, Role, ServerToClient } from '@quiz/shared';
import { CATALOG, type CategoryDef } from './catalog.js';
import { Game, GameError, type GameEffects, type Player } from './game.js';

const MAX_GAMES = 50;
const IDLE_LIMIT_MS = 12 * 60 * 60 * 1000;
const MEASURE_INTERVAL_MS = 10_000;
const MAX_LATENCY_MS = 500;
const PREPARE_LIMIT_MS = { video: 10_000, audio: 3000 };

interface SocketData {
  game?: Game;
  role?: Role;
  token?: string;
  latencies: number[];
}

type QuizSocket = Socket<ClientToServer, ServerToClient, Record<string, never>, SocketData>;
export type QuizServer = Server<ClientToServer, ServerToClient, Record<string, never>, SocketData>;

export interface HubOptions {
  adminPassword?: string;
  catalog?: CategoryDef[];
}

/** Verbindet die Sockets mit den Spielen; die Regeln selbst liegen in Game. */
export class Hub {
  private readonly games = new Map<string, Game>();
  private readonly catalog: CategoryDef[];
  private readonly adminPassword: string;
  private readonly cleanup: NodeJS.Timeout;

  constructor(
    private readonly io: QuizServer,
    options: HubOptions = {},
  ) {
    this.catalog = options.catalog ?? CATALOG;
    this.adminPassword = options.adminPassword ?? '';
    this.cleanup = setInterval(() => this.removeIdleGames(), 10 * 60 * 1000);
    this.cleanup.unref();
    io.on('connection', (socket) => this.onConnection(socket));
  }

  private onConnection(socket: QuizSocket): void {
    socket.data.latencies = [];
    const measurer = setInterval(() => this.measureLatency(socket), MEASURE_INTERVAL_MS);

    socket.on('create', (input, ack) =>
      respond(ack, () => {
        if (!this.passwordMatches(input?.password)) throw new GameError('Falsches Admin-Passwort.');
        const hostName = String(input?.hostName ?? '').trim().slice(0, 30);
        if (!hostName) throw new GameError('Bitte einen Namen eingeben.');
        if (this.games.size >= MAX_GAMES) this.removeIdleGames();
        if (this.games.size >= MAX_GAMES) throw new GameError('Der Server ist gerade voll.');

        const game = new Game(this.newCode(), hostName, this.catalog);
        this.games.set(game.code, game);
        return { code: game.code, token: game.adminToken };
      }),
    );

    socket.on('join', (input, ack) =>
      respond(ack, () => {
        const game = this.requireGame(input?.code);
        const player = game.join(String(input?.name ?? ''));
        this.broadcast(game);
        return { code: game.code, token: player.token };
      }),
    );

    socket.on('resume', (input, ack) =>
      respond(ack, () => {
        const game = this.requireGame(input?.code);
        const member = game.findByToken(String(input?.token));
        if (!member) throw new GameError('Sitzung abgelaufen.');
        this.detach(socket);

        socket.data.game = game;
        socket.data.role = member.role;
        socket.data.token = input.token;
        if (member.player) game.connect(member.player);
        socket.join(game.code);

        socket.emit('boards', game.visibleBoards(member.role, member.player));
        this.broadcast(game);
        this.measureLatency(socket);
        return {};
      }),
    );

    socket.on('act', (action, ack) =>
      respond(ack, () => {
        const { game, role } = socket.data;
        if (!game || role !== 'admin') throw new GameError('Das darf nur der Admin.');
        this.afterChange(game, game.apply(action));
        return {};
      }),
    );

    socket.on('buzz', () => {
      const player = this.currentPlayer(socket);
      if (!player) return;
      const game = socket.data.game!;
      if (game.buzz(player.id, average(socket.data.latencies))) {
        setTimeout(() => this.afterChange(game, game.resolveBuzz()), this.buzzWindow(game));
      }
    });

    socket.on('mapPick', (point) => {
      const player = this.currentPlayer(socket);
      if (!player) return;
      socket.data.game!.mapPick(player.id, point);
      this.broadcast(socket.data.game!);
    });

    socket.on('boardStroke', (stroke) => {
      this.changeBoard(socket, (game, player) => game.addStroke(player, stroke));
    });

    socket.on('boardDraft', (stroke) => {
      this.changeBoard(socket, (game, player) => game.setDraft(player, stroke ?? null));
    });

    socket.on('boardUndo', () => {
      this.changeBoard(socket, (game, player) => game.undoStroke(player));
    });

    socket.on('boardClear', () => {
      this.changeBoard(socket, (game, player) => game.clearStrokes(player));
    });

    socket.on('mediaReady', (id) => {
      const { game } = socket.data;
      if (!game) return;
      game.mediaReady(this.currentPlayer(socket)?.id ?? 'admin', String(id));
      this.broadcast(game);
    });

    socket.on('disconnect', () => {
      clearInterval(measurer);
      this.detach(socket);
    });
  }

  /** Der Admin sieht jede Änderung sofort, darum geht nur das geänderte Board raus. */
  private changeBoard(socket: QuizSocket, change: (game: Game, player: Player) => boolean): void {
    const player = this.currentPlayer(socket);
    const game = socket.data.game;
    if (!player || !game || !change(game, player)) return;
    for (const other of this.io.sockets.sockets.values()) {
      if (other.data.game === game && other.data.role === 'admin') other.emit('board', player.id, game.liveBoard(player));
    }
  }

  private detach(socket: QuizSocket): void {
    const { game } = socket.data;
    if (!game) return;
    const player = this.currentPlayer(socket);
    if (player) game.disconnect(player);
    socket.leave(game.code);
    socket.data.game = undefined;
    this.broadcast(game);
  }

  private afterChange(game: Game, effects: GameEffects): void {
    if (effects.kickedToken) void this.closeSockets(game, effects.kickedToken);
    this.broadcast(game);
    if (effects.boardsChanged) void this.sendBoards(game);
    if (effects.sfx) this.io.to(game.code).emit('sfx', effects.sfx);
    const { prepareId } = effects;
    if (prepareId) {
      // Ein hängender Client darf die Show nicht aufhalten.
      setTimeout(() => {
        if (game.startPlayback(prepareId)) this.broadcast(game);
      }, PREPARE_LIMIT_MS[game.run?.playback?.kind ?? 'video']).unref();
    }
  }

  /** Jeder Socket bekommt seine eigene gefilterte Sicht auf das Spiel. */
  private broadcast(game: Game): void {
    for (const socket of this.io.sockets.sockets.values()) {
      if (socket.data.game !== game) continue;
      socket.emit('state', this.viewFor(game, socket));
    }
  }

  private viewFor(game: Game, socket: QuizSocket): GameView {
    const member = game.findByToken(socket.data.token ?? '');
    return game.view(member?.role ?? 'player', member?.player ?? null);
  }

  private async sendBoards(game: Game): Promise<void> {
    for (const socket of this.io.sockets.sockets.values()) {
      if (socket.data.game !== game) continue;
      socket.emit('boards', game.visibleBoards(socket.data.role ?? 'player', this.currentPlayer(socket)));
    }
  }

  private async closeSockets(game: Game, token: string): Promise<void> {
    for (const socket of this.io.sockets.sockets.values()) {
      if (socket.data.game === game && socket.data.token === token) {
        socket.emit('closed', 'Du wurdest aus dem Spiel entfernt.');
        socket.data.game = undefined;
        socket.leave(game.code);
      }
    }
  }

  private currentPlayer(socket: QuizSocket) {
    const { game, token } = socket.data;
    return (token && game?.findByToken(token)?.player) || null;
  }

  private measureLatency(socket: QuizSocket): void {
    const sentAt = Date.now();
    socket.timeout(2000).emit('measure', (error: Error | null) => {
      if (error) return;
      const latency = Math.min((Date.now() - sentAt) / 2, MAX_LATENCY_MS);
      socket.data.latencies = [...socket.data.latencies, latency].slice(-3);
    });
  }

  /** Solange warten, bis auch der langsamste Spieler seinen Buzz durchbekommen hat. */
  private buzzWindow(game: Game): number {
    let max = 0;
    for (const socket of this.io.sockets.sockets.values()) {
      if (socket.data.game === game) max = Math.max(max, average(socket.data.latencies));
    }
    return max;
  }

  private requireGame(code: unknown): Game {
    const game = this.games.get(String(code ?? '').trim());
    if (!game) throw new GameError('Spiel nicht gefunden.');
    return game;
  }

  private newCode(): string {
    let code: string;
    do {
      code = String(randomInt(1000, 10000));
    } while (this.games.has(code));
    return code;
  }

  private passwordMatches(input: unknown): boolean {
    if (!this.adminPassword) return true;
    const given = Buffer.from(String(input ?? ''));
    const expected = Buffer.from(this.adminPassword);
    return given.length === expected.length && timingSafeEqual(given, expected);
  }

  private removeIdleGames(): void {
    const limit = Date.now() - IDLE_LIMIT_MS;
    for (const [code, game] of this.games) {
      if (game.lastActivity < limit) {
        this.io.to(code).emit('closed', 'Das Spiel wurde wegen Inaktivität beendet.');
        this.games.delete(code);
      }
    }
  }
}

function respond<T extends object>(ack: (result: Ack<T>) => void, work: () => T): void {
  if (typeof ack !== 'function') return;
  try {
    ack({ ok: true, ...work() });
  } catch (error) {
    if (!(error instanceof GameError)) console.error(error);
    ack({ ok: false, error: error instanceof GameError ? error.message : 'Unerwarteter Fehler.' });
  }
}

function average(values: number[]): number {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}
