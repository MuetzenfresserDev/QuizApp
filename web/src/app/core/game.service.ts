import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { io, type Socket } from 'socket.io-client';
import type { Ack, AdminAction, ClientToServer, GameView, Point, ServerToClient, Session, Sfx, Stroke } from '@quiz/shared';

const KEEPALIVE_MS = 5 * 60 * 1000;
const SFX_SOURCES: Record<Sfx, string> = {
  bonus: 'assets/bonus/bonus.mp3',
  buzz: 'assets/buzzer-sfx/buzz.mp3',
};

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly router = inject(Router);
  private readonly socket: Socket<ServerToClient, ClientToServer> = io();
  private session: Session | null = null;
  private clockOffset = 0;

  readonly view = signal<GameView | null>(null);
  readonly boards = signal<Record<string, Stroke[]>>({});
  readonly connected = signal(false);
  readonly notice = signal('');
  /** Der Browser hat Ton blockiert; ein Klick des Nutzers gibt ihn frei. */
  readonly soundBlocked = signal(false);
  /** Zählt hoch, wenn der Nutzer Ton freigegeben hat, damit Player es erneut versuchen. */
  readonly soundRetry = signal(0);

  readonly isAdmin = computed(() => this.view()?.role === 'admin');
  readonly run = computed(() => this.view()?.run ?? null);

  constructor() {
    this.socket.on('connect', () => {
      this.connected.set(true);
      if (!this.session) return;
      void this.resume(this.session).then((found) => {
        if (!found) this.leave('Das Spiel gibt es nicht mehr, vermutlich wurde der Server neu gestartet.');
      });
    });
    this.socket.on('disconnect', () => this.connected.set(false));
    this.socket.on('state', (view) => {
      this.clockOffset = view.serverNow - Date.now();
      this.view.set(view);
    });
    this.socket.on('boards', (boards) => this.boards.set(boards));
    this.socket.on('sfx', (name) => this.playSound(SFX_SOURCES[name]));
    this.socket.on('measure', (ack) => ack());
    this.socket.on('closed', (reason) => this.leave(reason));

    setInterval(() => {
      if (this.isAdmin()) void fetch('/keepalive');
    }, KEEPALIVE_MS);
  }

  serverNow(): number {
    return Date.now() + this.clockOffset;
  }

  async create(hostName: string, password: string): Promise<string> {
    const session = await this.request<Session>((ack) => this.socket.emit('create', { hostName, password }, ack));
    return this.enter(session);
  }

  async join(code: string, name: string): Promise<string> {
    const session = await this.request<Session>((ack) => this.socket.emit('join', { code, name }, ack));
    return this.enter(session);
  }

  /** Stellt die gespeicherte Sitzung eines Spiels wieder her; false, wenn es keine gültige gibt. */
  async open(code: string): Promise<boolean> {
    // Der Tab zuerst: Admin und Spieler können im selben Browser getrennte Tabs nutzen.
    const stored = sessionStorage.getItem(storageKey(code)) ?? localStorage.getItem(storageKey(code));
    if (!stored) return false;
    return this.resume(JSON.parse(stored) as Session);
  }

  act(action: AdminAction): void {
    this.socket.emit('act', action, (result) => {
      if (!result.ok) this.notice.set(result.error);
    });
  }

  buzz(): void {
    this.socket.emit('buzz');
  }

  mapPick(point: Point): void {
    this.socket.emit('mapPick', point);
  }

  addStroke(stroke: Stroke): void {
    const id = this.view()?.selfId;
    if (!id) return;
    this.updateBoard(id, (strokes) => [...strokes, stroke]);
    this.socket.emit('boardStroke', stroke);
  }

  undoStroke(): void {
    const id = this.view()?.selfId;
    if (!id) return;
    this.updateBoard(id, (strokes) => strokes.slice(0, -1));
    this.socket.emit('boardUndo');
  }

  clearBoard(): void {
    const id = this.view()?.selfId;
    if (!id) return;
    this.updateBoard(id, () => []);
    this.socket.emit('boardClear');
  }

  playSound(src: string): void {
    new Audio(src).play().catch(() => this.soundBlocked.set(true));
  }

  unlockSound(): void {
    this.soundBlocked.set(false);
    this.soundRetry.update((value) => value + 1);
  }

  private updateBoard(id: string, change: (strokes: Stroke[]) => Stroke[]): void {
    this.boards.update((boards) => ({ ...boards, [id]: change(boards[id] ?? []) }));
  }

  private async enter(session: Session): Promise<string> {
    this.store(session);
    await this.resume(session);
    return session.code;
  }

  private async resume(session: Session): Promise<boolean> {
    try {
      await this.request((ack) => this.socket.emit('resume', session, ack));
      this.session = session;
      return true;
    } catch {
      this.forget(session.code);
      this.session = null;
      return false;
    }
  }

  private store(session: Session): void {
    const value = JSON.stringify(session);
    sessionStorage.setItem(storageKey(session.code), value);
    localStorage.setItem(storageKey(session.code), value);
  }

  private forget(code: string): void {
    sessionStorage.removeItem(storageKey(code));
    localStorage.removeItem(storageKey(code));
  }

  private leave(reason: string): void {
    if (this.session) this.forget(this.session.code);
    this.session = null;
    this.view.set(null);
    this.boards.set({});
    this.notice.set(reason);
    void this.router.navigateByUrl('/');
  }

  private request<T extends object = object>(send: (ack: (result: Ack<T>) => void) => void): Promise<T> {
    return new Promise((resolve, reject) =>
      send((result) => (result.ok ? resolve(result) : reject(new Error(result.error)))),
    );
  }
}

function storageKey(code: string): string {
  return `quiz:session:${code}`;
}
