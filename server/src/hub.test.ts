import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { Server } from 'socket.io';
import { io as connect, type Socket } from 'socket.io-client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { AdminAction, ClientToServer, GameView, ServerToClient, Session } from '@quiz/shared';
import { Hub, type QuizServer } from './hub.js';

type Client = Socket<ServerToClient, ClientToServer> & { view?: GameView };

describe('Hub', () => {
  let io: QuizServer;
  let url: string;
  const clients: Client[] = [];

  beforeEach(async () => {
    const http = createServer();
    io = new Server(http);
    new Hub(io, { adminPassword: 'geheim' });
    await new Promise<void>((done) => http.listen(0, done));
    url = `http://localhost:${(http.address() as AddressInfo).port}`;
  });

  afterEach(async () => {
    clients.splice(0).forEach((client) => client.disconnect());
    await io.close();
  });

  async function client(): Promise<Client> {
    const socket: Client = connect(url, { forceNew: true });
    socket.on('state', (view) => (socket.view = view));
    clients.push(socket);
    await new Promise<void>((done) => socket.once('connect', done));
    return socket;
  }

  const session = (socket: Client, event: 'create' | 'join', input: never) =>
    new Promise<Session>((done, fail) =>
      (socket.emit as (...args: unknown[]) => void)(event, input, (result: { ok: boolean; error?: string } & Session) =>
        result.ok ? done(result) : fail(new Error(result.error)),
      ),
    );

  const resume = (socket: Client, input: Session) =>
    new Promise<void>((done) => socket.emit('resume', input, () => done()));

  const act = (socket: Client, action: AdminAction) =>
    new Promise<{ ok: boolean }>((done) => socket.emit('act', action, done));

  const settled = (socket: Client, check: (view: GameView) => boolean) =>
    new Promise<GameView>((done) => {
      const poll = () => (socket.view && check(socket.view) ? done(socket.view) : setTimeout(poll, 5));
      poll();
    });

  async function lobby() {
    const admin = await client();
    const created = await session(admin, 'create', { hostName: 'Host', password: 'geheim' } as never);
    await resume(admin, created);
    const player = await client();
    const joined = await session(player, 'join', { code: created.code, name: 'Anna' } as never);
    await resume(player, joined);
    return { admin, player, created, joined };
  }

  it('verlangt das Admin-Passwort', async () => {
    const socket = await client();
    await expect(session(socket, 'create', { hostName: 'Host', password: 'falsch' } as never)).rejects.toThrow('Passwort');
  });

  it('lässt Spieler keine Admin-Aktionen ausführen', async () => {
    const { player } = await lobby();
    expect((await act(player, { type: 'start' })).ok).toBe(false);
  });

  it('verteilt Änderungen an alle und ist je Rolle gefiltert', async () => {
    const { admin, player } = await lobby();
    await act(admin, { type: 'start' });
    await act(admin, { type: 'openQuestion', category: 0, row: 0 });
    await act(admin, { type: 'showQuestion' });
    await act(admin, { type: 'releasePrompt' });

    const seen = await settled(player, (view) => !!view.run?.prompt);
    expect(seen.role).toBe('player');
    expect(seen.selfId).not.toBeNull();
    expect(seen.run!.prompt).toBe('Wer ist Ulmar?');
    expect(seen.run!.answer).toBeNull();
    expect((await settled(admin, (view) => view.run?.questionVisible === true)).role).toBe('admin');
  });

  it('stellt den Spieler nach einem Reconnect wieder her', async () => {
    const { admin, player, joined } = await lobby();
    player.disconnect();
    await settled(admin, (view) => view.players[0]?.connected === false);

    const again = await client();
    await resume(again, joined);
    await settled(admin, (view) => view.players[0]?.connected === true);
    expect((await settled(again, () => true)).selfId).toBe(admin.view!.players[0]!.id);
  });

  it('überlebt kaputte Nachrichten', async () => {
    const { admin, player } = await lobby();
    await act(admin, { type: 'start' });
    await act(admin, { type: 'openQuestion', category: 3, row: 0 });
    await act(admin, { type: 'showQuestion' });
    const raw = player as unknown as { emit(event: string, ...args: unknown[]): void };
    raw.emit('mapPick', null);
    raw.emit('boardStroke', null);
    raw.emit('boardStroke', { points: 'x' });
    raw.emit('join', null);
    raw.emit('act', null);
    raw.emit('resume', null, () => undefined);
    expect((await act(admin, { type: 'closeQuestion' })).ok).toBe(true);
  });

  it('wertet Buzzes aus', async () => {
    const { admin, player } = await lobby();
    await act(admin, { type: 'start' });
    await act(admin, { type: 'openQuestion', category: 0, row: 0 });
    await act(admin, { type: 'showQuestion' });
    await act(admin, { type: 'buzzerRelease' });
    await settled(player, (view) => view.run?.buzzer?.frozenIds.length === 0);

    const sound = new Promise((done) => admin.once('sfx', done));
    player.emit('buzz');
    expect(await sound).toBe('buzz');
    const view = await settled(admin, (v) => !!v.run?.buzzer?.buzzedId);
    expect(view.run!.buzzer!.buzzedId).toBe(view.players[0]!.id);
  });

  it('informiert entfernte Spieler und ignoriert sie danach', async () => {
    const { admin, player } = await lobby();
    const id = (await settled(admin, (view) => view.players.length === 1)).players[0]!.id;
    const closed = new Promise((done) => player.once('closed', done));
    await act(admin, { type: 'kick', playerId: id });
    expect(await closed).toContain('entfernt');
  });
});
