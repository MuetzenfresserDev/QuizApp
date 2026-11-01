import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { io, type Socket } from 'socket.io-client';
import type { Ack, AdminAction, ClientToServer, GameView, Point, ServerToClient, Session, Sfx, Stroke } from '@quiz/shared';

const KEEPALIVE_MS = 5 * 60 * 1000;
const SESSION_KEY = 'quiz:session';
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
  /** Zählt hoch, wenn der Scavenger bei diesem Client durchs Bild soll. */
  readonly scavengerPass = signal(0);

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
    this.socket.on('board', (id, strokes) => this.updateBoard(id, () => strokes));
    this.socket.on('sfx', (name) => {
      this.playSound(SFX_SOURCES[name]);
      if (name === 'buzz' && (this.isAdmin() || this.run()?.buzzer?.buzzedId === this.view()?.selfId)) {
        this.scavengerPass.update((pass) => pass + 1);
      }
    });
    this.socket.on('measure', (ack) => ack());
    this.socket.on('closed', (reason) => this.leave(reason));

    setInterval(() => {
      if (this.isAdmin()) void fetch('/keepalive');
    }, KEEPALIVE_MS);
  }

  serverNow(): number {
    return Date.now() + this.clockOffset;
  }

  async create(hostName: string, password: string): Promise<void> {
    await this.enter(await this.request<Session>((ack) => this.socket.emit('create', { hostName, password }, ack)));
  }

  async join(code: string, name: string): Promise<void> {
    await this.enter(await this.request<Session>((ack) => this.socket.emit('join', { code, name }, ack)));
  }

  /** Stellt die gespeicherte Sitzung wieder her; false, wenn es keine gültige gibt. */
  async open(): Promise<boolean> {
    // Der Tab zuerst: Admin und Spieler können im selben Browser getrennte Tabs nutzen.
    const stored = sessionStorage.getItem(SESSION_KEY) ?? localStorage.getItem(SESSION_KEY);
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

  sendDraft(stroke: Stroke | null): void {
    this.socket.emit('boardDraft', stroke);
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

  mediaReady(id: string): void {
    this.socket.emit('mediaReady', id);
  }

  playSound(src: string): void {
    new Audio(src).play().catch(() => undefined);
  }

  private updateBoard(id: string, change: (strokes: Stroke[]) => Stroke[]): void {
    this.boards.update((boards) => ({ ...boards, [id]: change(boards[id] ?? []) }));
  }

  private async enter(session: Session): Promise<void> {
    this.store(session);
    await this.resume(session);
  }

  private async resume(session: Session): Promise<boolean> {
    try {
      await this.request((ack) => this.socket.emit('resume', session, ack));
      this.session = session;
      return true;
    } catch {
      this.forget();
      this.session = null;
      return false;
    }
  }

  private store(session: Session): void {
    const value = JSON.stringify(session);
    sessionStorage.setItem(SESSION_KEY, value);
    localStorage.setItem(SESSION_KEY, value);
  }

  private forget(): void {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  }

  private leave(reason: string): void {
    this.forget();
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

