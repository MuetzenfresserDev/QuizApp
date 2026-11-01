import { describe, expect, it } from 'vitest';
import type { CategoryDef } from './catalog.js';
import { CATALOG } from './catalog.js';
import { youtubeId } from '@quiz/shared';
import { Game, GameError } from './game.js';

const catalog: CategoryDef[] = [
  {
    name: 'Test',
    image: 'cat.png',
    questions: [
      { mode: 'buzzer', prompt: 'Buzz?', answer: { text: 'GEHEIM' } },
      {
        mode: 'whiteboard',
        prompt: 'Mal!',
        media: { video: 'https://youtu.be/abcdefghijk' },
        answer: { text: 'GEHEIM' },
        boardImage: 'normal.png',
        imposter: { slot: 1, boardImage: 'imposter.png' },
      },
      {
        mode: 'map',
        prompt: 'Wo?',
        media: { image: 'such.png' },
        answer: {},
        map: { image: 'map.png', goal: { x: 425, y: 296 } },
      },
      { mode: 'whiteboard', prompt: 'Bonus', bonus: true, answer: {} },
      { mode: 'buzzer', prompt: 'Bild?', media: { image: 'b.png' }, answer: {} },
      { mode: 'buzzer', prompt: 'Audio?', media: { audio: 'a.mp3' }, answer: {} },
    ],
  },
];

function lobby(clock = { now: 1000 }) {
  const game = new Game('1234', 'Host', catalog, () => clock.now);
  const a = game.join('Anna');
  const b = game.join('Ben');
  game.connect(a);
  game.connect(b);
  return { game, a, b, clock };
}

function setup(clock = { now: 1000 }) {
  const result = lobby(clock);
  result.game.apply({ type: 'start' });
  return result;
}

/** Startet ein Medium und meldet alle Teilnehmer als bereit. */
function play(game: Game, target: 'question' | 'answer', kind: 'video' | 'audio') {
  const id = game.apply({ type: 'mediaPlay', target, kind }).prepareId!;
  for (const member of ['admin', ...game.players.map((p) => p.id)]) game.mediaReady(member, id);
}

const open = (game: Game, row: number) => {
  game.apply({ type: 'openQuestion', category: 0, row });
  game.apply({ type: 'showQuestion' });
};

describe('Lobby', () => {
  it('lehnt doppelte Namen ab, solange der Spieler verbunden ist', () => {
    const { game } = lobby();
    expect(() => game.join('anna')).toThrow(GameError);
  });

  it('gibt einem getrennten Spieler seinen Platz zurück', () => {
    const { game, a } = setup();
    game.disconnect(a);
    expect(game.join('Anna')).toBe(a);
  });

  it('nimmt maximal vier Spieler auf', () => {
    const { game } = lobby();
    game.join('C');
    game.join('D');
    expect(() => game.join('E')).toThrow('voll');
  });

  it('vergibt jedes Icon nur einmal', () => {
    const { game } = lobby();
    game.join('C');
    expect(new Set(game.players.map((p) => p.icon)).size).toBe(3);
  });
});

describe('Beitritt im laufenden Spiel', () => {
  it('nimmt nach dem Start niemand Neues auf', () => {
    const { game } = setup();
    expect(() => game.join('Fremd')).toThrow('läuft bereits');
  });
});

describe('Geheimhaltung', () => {
  it('verrät weder dem Admin noch Spielern die Lösung vor dem Aufdecken', () => {
    const { game, a } = setup();
    open(game, 0);
    for (const view of [game.view('admin', null), game.view('player', a)]) {
      expect(JSON.stringify(view)).not.toContain('GEHEIM');
    }
    game.apply({ type: 'showSolution' });
    expect(JSON.stringify(game.view('player', a))).toContain('GEHEIM');
  });

  it('zeigt die reine Textfrage beim Buzzer erst nach der Freigabe', () => {
    const { game, a } = setup();
    open(game, 0);
    for (const view of [game.view('admin', null), game.view('player', a)]) {
      expect(view.run).toMatchObject({ prompt: null, promptPending: true });
    }
    expect(JSON.stringify(game.view('player', a))).not.toContain('Buzz?');
    game.apply({ type: 'releasePrompt' });
    expect(game.view('player', a).run).toMatchObject({ prompt: 'Buzz?', promptPending: false });
  });

  it('zeigt Fragen mit Medien ohne zusätzliche Freigabe', () => {
    const { game, a } = setup();
    open(game, 4);
    expect(game.view('player', a).run).toMatchObject({ prompt: 'Bild?', promptPending: false });
  });

  it('zeigt die Frage erst nach showQuestion', () => {
    const { game, a } = setup();
    game.apply({ type: 'openQuestion', category: 0, row: 0 });
    expect(JSON.stringify(game.view('player', a))).not.toContain('Buzz?');
  });

  it('versteckt Ziel und fremde Tipps auf der Karte', () => {
    const { game, a, b } = setup();
    open(game, 2);
    game.mapPick(a.id, { x: 0.5, y: 0.5 });
    const map = game.view('player', b).run!.map!;
    expect(map.picks).toBeNull();
    expect(map.goal).toBeNull();
    expect(map.submittedIds).toEqual([a.id]);
    expect(game.view('player', a).run!.map!.myPick).toEqual({ x: 0.5, y: 0.5 });
  });

  it('zeigt nach den Entfernungen allen Spielern alle Positionen', () => {
    const { game, a, b } = setup();
    open(game, 2);
    game.mapPick(a.id, { x: 0.1, y: 0.1 });
    game.mapPick(b.id, { x: 0.9, y: 0.9 });
    game.apply({ type: 'mapShowDistances' });
    for (const viewer of [a, b]) {
      const map = game.view('player', viewer).run!.map!;
      expect(Object.keys(map.picks!)).toEqual([a.id, b.id]);
      expect(Object.keys(map.distances!)).toEqual([a.id, b.id]);
      expect(map.goal).not.toBeNull();
    }
  });

  it('zeigt dem Admin jede Bewegung live, aber nie das Ziel', () => {
    const { game, a } = setup();
    open(game, 2);
    game.mapPick(a.id, { x: 0.1, y: 0.1 });
    game.mapPick(a.id, { x: 0.2, y: 0.2 });
    const map = game.view('admin', null).run!.map!;
    expect(map.picks).toEqual({ [a.id]: { x: 0.2, y: 0.2 } });
    expect(map.goal).toBeNull();
  });

  it('versteckt das Bild einer Buzzer-Frage bis zur Freigabe', () => {
    const { game, a } = setup();
    open(game, 4);
    expect(game.view('player', a).run!.media.image).toBeUndefined();
    expect(game.view('admin', null).run!.media.image).toBeUndefined();
    expect(game.view('admin', null).run!.hasPicture).toBe(true);
    game.apply({ type: 'togglePicture' });
    expect(game.view('player', a).run!.media.image).toBe('b.png');
  });

  it('zeigt Beschriftungen erst mit dem Zeigen der Boards', () => {
    const { game, a, b } = setup();
    open(game, 1);
    game.addStroke(a, { id: 't', color: '#111111', width: 0.008, points: [{ x: 0.3, y: 0.4 }], text: 'Antwort' });
    expect(game.visibleBoards('player', a)[a.id]![0]!.text).toBe('Antwort');
    expect(game.visibleBoards('player', b)[a.id]).toBeUndefined();
    game.apply({ type: 'showBoards' });
    expect(game.visibleBoards('player', b)[a.id]![0]).toMatchObject({ text: 'Antwort', points: [{ x: 0.3, y: 0.4 }] });
  });

  it('zeigt das Suchbild der Karte erst nach Freigabe', () => {
    const { game, a } = setup();
    open(game, 2);
    expect(game.view('player', a).run!.media.image).toBeUndefined();
    game.apply({ type: 'togglePicture' });
    expect(game.view('player', a).run!.media.image).toBe('such.png');
  });

  it('gibt fremde Whiteboards dem Admin live und Spielern erst nach dem Zeigen frei', () => {
    const { game, a, b } = setup();
    open(game, 1);
    game.addStroke(a, { id: '1', color: '#111111', width: 0.008, points: [{ x: 0, y: 0 }] });
    expect(game.visibleBoards('player', b)[a.id]).toBeUndefined();
    expect(game.visibleBoards('player', null)[a.id]).toBeUndefined();
    expect(game.visibleBoards('admin', null)[a.id]).toHaveLength(1);
    game.apply({ type: 'showBoards' });
    expect(game.visibleBoards('player', b)[a.id]).toHaveLength(1);
  });

  it('gibt dem Imposter sein eigenes Board-Bild und verrät es Spielern nicht vorab', () => {
    const { game, a, b } = setup();
    open(game, 1);
    expect(game.view('player', a).run!.boardImages).toEqual({ [a.id]: 'normal.png' });
    expect(game.view('player', b).run!.boardImages).toEqual({ [b.id]: 'imposter.png' });
    expect(game.view('admin', null).run!.boardImages).toEqual({ [a.id]: 'normal.png', [b.id]: 'imposter.png' });
  });
});

describe('Buzzer', () => {
  const release = (game: Game) => {
    open(game, 0);
    game.apply({ type: 'buzzerRelease' });
  };

  it('ist vor dem Zeigen der Frage gesperrt', () => {
    const { game, a } = setup();
    game.apply({ type: 'openQuestion', category: 0, row: 0 });
    expect(game.buzz(a.id, 0)).toBe(false);
  });

  it('öffnet bei reinen Textfragen erst mit der Freigabe', () => {
    const { game, a } = setup();
    open(game, 0);
    expect(game.buzz(a.id, 0)).toBe(false);
    game.apply({ type: 'releasePrompt' });
    expect(game.buzz(a.id, 0)).toBe(true);
  });

  it('öffnet bei Bildfragen erst mit der Bildfreigabe', () => {
    const { game, a } = setup();
    open(game, 4);
    expect(game.buzz(a.id, 0)).toBe(false);
    game.apply({ type: 'togglePicture' });
    expect(game.buzz(a.id, 0)).toBe(true);
  });

  it('öffnet bei Audiofragen mit dem Abspielstart', () => {
    const { game, a } = setup();
    open(game, 5);
    expect(game.buzz(a.id, 0)).toBe(false);
    play(game, 'question', 'audio');
    expect(game.buzz(a.id, 0)).toBe(true);
  });

  it('öffnet eingefrorene Spieler beim Wiederholen nicht von selbst', () => {
    const { game, a } = setup();
    open(game, 5);
    play(game, 'question', 'audio');
    game.apply({ type: 'buzzerFreezeAll' });
    play(game, 'question', 'audio');
    expect(game.buzz(a.id, 0)).toBe(false);
  });

  it('wertet den Buzz mit kleinster bereinigter Zeit', () => {
    const { game, a, b, clock } = setup();
    release(game);
    expect(game.buzz(a.id, 0)).toBe(true);
    clock.now += 50;
    expect(game.buzz(b.id, 200)).toBe(false);
    expect(game.resolveBuzz().sfx).toBe('buzz');
    expect(game.view('player', a).run!.buzzer!.buzzedId).toBe(b.id);
  });

  it('sperrt danach alle weiteren Buzzes', () => {
    const { game, a, b } = setup();
    release(game);
    game.buzz(a.id, 0);
    game.resolveBuzz();
    expect(game.buzz(b.id, 0)).toBe(false);
  });

  it('lässt nach Einfrieren den anderen Spieler buzzern', () => {
    const { game, a, b } = setup();
    release(game);
    game.buzz(a.id, 0);
    game.resolveBuzz();
    game.apply({ type: 'buzzerFreezeBuzzed' });
    expect(game.buzz(a.id, 0)).toBe(false);
    expect(game.buzz(b.id, 0)).toBe(true);
  });
});

describe('Robustheit', () => {
  it('wertet keinen Buzz eines entfernten Spielers', () => {
    const { game, a } = setup();
    open(game, 0);
    game.apply({ type: 'buzzerRelease' });
    game.buzz(a.id, 0);
    game.apply({ type: 'kick', playerId: a.id });
    expect(game.resolveBuzz()).toEqual({});
    expect(game.run!.buzzedId).toBeNull();
  });

  it('übersteht ungültige Karten-Tipps', () => {
    const { game, a } = setup();
    open(game, 2);
    expect(() => game.mapPick(a.id, null as never)).not.toThrow();
    game.mapPick(a.id, { x: 5, y: -1 });
    expect(game.view('player', a).run!.map!.myPick).toBeNull();
  });

  it('ignoriert Doppelklicks auf Kachel und Zurück', () => {
    const { game, a, b } = setup();
    game.apply({ type: 'openQuestion', category: 0, row: 1 });
    game.apply({ type: 'openQuestion', category: 0, row: 2 });
    expect(game.run!.row).toBe(1);
    game.apply({ type: 'showQuestion' });
    game.apply({ type: 'closeQuestion' });
    game.apply({ type: 'closeQuestion' });
    expect(game.activePlayerId).toBe(b.id);
    expect(a.id).not.toBe(b.id);
  });

  it('nimmt keine erfundene Medienart an', () => {
    const { game } = setup();
    open(game, 1);
    expect(() => game.apply({ type: 'mediaPlay', target: 'question', kind: '__proto__' as never })).toThrow(GameError);
  });
});

describe('Whiteboard', () => {
  const stroke = { id: '1', color: '#111111', width: 0.008, points: [{ x: 0.1, y: 0.1 }] };

  it('bleibt nach dem Zeigen gesperrt', () => {
    const { game, a } = setup();
    open(game, 1);
    game.apply({ type: 'showBoards' });
    game.apply({ type: 'hideBoards' });
    expect(game.addStroke(a, stroke)).toBe(false);
  });

  it('zeigt dem Admin auch Text, der noch getippt wird', () => {
    const { game, a, b } = setup();
    open(game, 1);
    game.setDraft(a, { ...stroke, id: 'draft', text: 'Tippe' });
    expect(game.visibleBoards('admin', null)[a.id]!.map((s) => s.text)).toEqual(['Tippe']);
    expect(game.visibleBoards('player', a)[a.id]).toEqual([]);
    expect(game.visibleBoards('player', b)[a.id]).toBeUndefined();
  });

  it('bringt nach der Lösung die Boards zurück', () => {
    const { game } = setup();
    open(game, 1);
    game.apply({ type: 'showBoards' });
    game.apply({ type: 'showSolution' });
    expect(game.run!.boardsVisible).toBe(false);
    game.apply({ type: 'showBoards' });
    expect(game.run!.boardsVisible).toBe(true);
  });

  it('sperrt das Zeichnen nach dem Zeigen der Boards', () => {
    const { game, a } = setup();
    open(game, 1);
    expect(game.addStroke(a, stroke)).toBe(true);
    game.apply({ type: 'showBoards' });
    expect(game.addStroke(a, stroke)).toBe(false);
    expect(game.clearStrokes(a)).toBe(false);
  });

  it('weist ungültige Strokes ab', () => {
    const { game, a } = setup();
    open(game, 1);
    expect(game.addStroke(a, { ...stroke, color: 'url(x)' })).toBe(false);
    expect(game.addStroke(a, { ...stroke, points: [{ x: 2, y: 0 }] })).toBe(false);
    expect(game.addStroke(a, { ...stroke, width: 99 })).toBe(false);
  });

  it('reicht die Schreibspalte an die Clients weiter', () => {
    const { game, a } = setup();
    open(game, 1);
    expect(game.view('player', a).run!.boardNotes).toBe(false);
    game.run!.question = { ...game.run!.question, boardNotes: true };
    expect(game.view('player', a).run!.boardNotes).toBe(true);
  });

  it('prüft Beschriftungen', () => {
    const { game, a } = setup();
    open(game, 1);
    expect(game.addStroke(a, { ...stroke, text: 'ok' })).toBe(true);
    expect(game.addStroke(a, { ...stroke, text: '' })).toBe(false);
    expect(game.addStroke(a, { ...stroke, text: 'x'.repeat(201) })).toBe(false);
    expect(game.addStroke(a, { ...stroke, text: 5 as never })).toBe(false);
    expect(game.addStroke(a, { ...stroke, text: 'ok', points: [{ x: 0, y: 0 }, { x: 1, y: 1 }] })).toBe(false);
  });

  it('übernimmt offenen Text beim Zeigen der Boards', () => {
    const { game, a, b } = setup();
    open(game, 1);
    game.setDraft(a, { ...stroke, id: 'draft', text: 'Vergessen' });
    expect(game.apply({ type: 'showBoards' }).boardsChanged).toBe(true);
    expect(game.visibleBoards('player', b)[a.id]!.map((s) => s.text)).toEqual(['Vergessen']);
    expect(a.draft).toBeNull();
  });

  it('übernimmt fertigen Text nicht doppelt', () => {
    const { game, a } = setup();
    open(game, 1);
    game.setDraft(a, { ...stroke, id: 'draft', text: 'Fertig' });
    game.addStroke(a, { ...stroke, id: 'final', text: 'Fertig' });
    game.apply({ type: 'showBoards' });
    expect(a.strokes).toHaveLength(1);
  });

  it('verwirft abgebrochenen Text', () => {
    const { game, a } = setup();
    open(game, 1);
    game.setDraft(a, { ...stroke, id: 'draft', text: 'Weg' });
    game.setDraft(a, null);
    game.apply({ type: 'showBoards' });
    expect(a.strokes).toEqual([]);
  });

  it('nimmt offenen Text nicht in die nächste Frage mit', () => {
    const { game, a } = setup();
    open(game, 1);
    game.setDraft(a, { ...stroke, id: 'draft', text: 'Alt' });
    game.apply({ type: 'closeQuestion' });
    open(game, 3);
    game.apply({ type: 'showBoards' });
    expect(a.strokes).toEqual([]);
  });

  it('weist kaputte Entwürfe ab', () => {
    const { game, a } = setup();
    open(game, 1);
    expect(game.setDraft(a, { ...stroke, text: undefined })).toBe(false);
    expect(game.setDraft(a, 'x' as never)).toBe(false);
  });

  it('nimmt Beschriftungen mit Rückgängig wieder zurück', () => {
    const { game, a } = setup();
    open(game, 1);
    game.addStroke(a, { ...stroke, text: 'ok' });
    game.undoStroke(a);
    expect(a.strokes).toEqual([]);
  });

  it('beginnt jede Frage mit leeren Boards', () => {
    const { game, a } = setup();
    open(game, 1);
    game.addStroke(a, stroke);
    game.apply({ type: 'closeQuestion' });
    open(game, 3);
    expect(a.strokes).toEqual([]);
  });
});

describe('Karte', () => {
  it('misst den Abstand in Pixeln der alten Karte', () => {
    const { game, a } = setup();
    open(game, 2);
    game.mapPick(a.id, { x: 0.5, y: 0.5 + 100 / 592 });
    game.apply({ type: 'mapShowDistances' });
    expect(game.view('player', a).run!.map!.distances).toEqual({ [a.id]: 100 });
  });

  it('nimmt nach dem Aufdecken keine Tipps mehr an', () => {
    const { game, a } = setup();
    open(game, 2);
    game.apply({ type: 'mapShowDistances' });
    game.mapPick(a.id, { x: 0.5, y: 0.5 });
    expect(game.view('player', a).run!.map!.myPick).toBeNull();
  });
});

describe('Medien und Timer', () => {
  it('rechnet die Position beim Pausieren fort', () => {
    const { game, clock } = setup();
    open(game, 1);
    play(game, 'question', 'video');
    clock.now += 4000;
    game.apply({ type: 'mediaPause' });
    expect(game.run!.playback).toMatchObject({ playing: false, positionSec: 4 });
  });

  it('startet erst, wenn alle Verbundenen gepuffert haben', () => {
    const { game, a, b } = setup();
    open(game, 1);
    const id = game.apply({ type: 'mediaPlay', target: 'question', kind: 'video' }).prepareId!;
    expect(game.view('player', a).run!.playback).toMatchObject({ preparing: true, playing: false, expectedCount: 3 });
    expect(game.mediaReady('admin', id)).toBe(false);
    expect(game.mediaReady(a.id, id)).toBe(false);
    expect(game.view('player', a).run!.playback!.readyCount).toBe(2);
    expect(game.mediaReady(b.id, id)).toBe(true);
    expect(game.view('player', a).run!.playback).toMatchObject({ preparing: false, playing: true });
  });

  it('wartet nicht auf getrennte Spieler', () => {
    const { game, a, b } = setup();
    open(game, 1);
    game.disconnect(b);
    const id = game.apply({ type: 'mediaPlay', target: 'question', kind: 'video' }).prepareId!;
    game.mediaReady('admin', id);
    expect(game.mediaReady(a.id, id)).toBe(true);
  });

  it('startet, wenn sich der letzte fehlende Spieler trennt', () => {
    const { game, a, b } = setup();
    open(game, 1);
    const id = game.apply({ type: 'mediaPlay', target: 'question', kind: 'video' }).prepareId!;
    game.mediaReady('admin', id);
    game.mediaReady(a.id, id);
    game.disconnect(b);
    expect(game.run!.playback).toMatchObject({ preparing: false, playing: true });
  });

  it('ignoriert Bereitschaft einer veralteten Wiedergabe', () => {
    const { game, a } = setup();
    open(game, 1);
    const old = game.apply({ type: 'mediaPlay', target: 'question', kind: 'video' }).prepareId!;
    game.apply({ type: 'mediaPlay', target: 'question', kind: 'video' });
    expect(game.mediaReady(a.id, old)).toBe(false);
    expect(game.startPlayback(old)).toBe(false);
  });

  it('lässt ein Medium nach dem Ende erneut abspielen', () => {
    const { game } = setup();
    open(game, 1);
    play(game, 'question', 'video');
    game.apply({ type: 'mediaEnded' });
    expect(game.run!.playback).toBeNull();
    play(game, 'question', 'video');
    expect(game.run!.playback).toMatchObject({ playing: true, positionSec: 0 });
  });

  it('verweigert Medien der Lösung vor dem Aufdecken', () => {
    const { game } = setup();
    open(game, 1);
    expect(() => game.apply({ type: 'mediaPlay', target: 'answer', kind: 'video' })).toThrow(GameError);
  });

  it('merkt sich die Restzeit des Timers', () => {
    const { game, clock } = setup();
    open(game, 1);
    game.apply({ type: 'timerStart' });
    clock.now += 10_000;
    game.apply({ type: 'timerPause' });
    expect(game.run!.timer).toMatchObject({ running: false, remainingMs: 20_000 });
  });
});

describe('Spielablauf', () => {
  it('wechselt den aktiven Spieler nach jeder Frage', () => {
    const { game, a, b } = setup();
    expect(game.activePlayerId).toBe(a.id);
    open(game, 1);
    game.apply({ type: 'closeQuestion' });
    expect(game.activePlayerId).toBe(b.id);
  });

  it('zählt eine nur angeklickte Frage nicht als gespielt', () => {
    const { game, a } = setup();
    game.apply({ type: 'openQuestion', category: 0, row: 1 });
    game.apply({ type: 'closeQuestion' });
    const view = game.view('admin', null);
    expect(view.phase).toBe('board');
    expect(view.playedCount).toBe(0);
    expect(view.categories[0]!.tiles[1]!.used).toBe(false);
    expect(view.activePlayerId).toBe(a.id);
  });

  it('zählt eine nicht freigegebene Textfrage nicht als gespielt', () => {
    const { game, a } = setup();
    open(game, 0);
    game.apply({ type: 'closeQuestion' });
    expect(game.view('admin', null).playedCount).toBe(0);
    expect(game.activePlayerId).toBe(a.id);
  });

  it('zählt eine freigegebene Textfrage als gespielt', () => {
    const { game, b } = setup();
    open(game, 0);
    game.apply({ type: 'releasePrompt' });
    game.apply({ type: 'closeQuestion' });
    expect(game.view('admin', null).playedCount).toBe(1);
    expect(game.activePlayerId).toBe(b.id);
  });

  it('stellt die Markierung der letzten Kachel wieder her', () => {
    const { game } = setup();
    open(game, 1);
    game.apply({ type: 'closeQuestion' });
    game.apply({ type: 'openQuestion', category: 0, row: 2 });
    game.apply({ type: 'closeQuestion' });
    expect(game.view('admin', null).lastTile).toEqual({ category: 0, row: 1 });
  });

  it('löst durch Verklicken keine Verdopplung aus', () => {
    const game = new Game('1', 'Host', CATALOG);
    game.join('A');
    game.apply({ type: 'start' });
    for (let i = 0; i < 12; i += 1) {
      game.apply({ type: 'openQuestion', category: 0, row: 0 });
      game.apply({ type: 'closeQuestion' });
    }
    expect(game.view('admin', null).doubled).toBe(false);
  });

  it('spielt den Bonus-Sound bei Bonusfragen', () => {
    const { game } = setup();
    expect(game.apply({ type: 'openQuestion', category: 0, row: 3 }).sfx).toBe('bonus');
  });

  it('verdoppelt offene Kacheln nach zehn gespielten Fragen', () => {
    const game = new Game('1', 'Host', CATALOG);
    game.join('A');
    game.apply({ type: 'start' });
    let last: ReturnType<Game['apply']> = {};
    for (let i = 0; i < 10; i += 1) {
      game.apply({ type: 'openQuestion', category: Math.floor(i / 5), row: i % 5 });
      game.apply({ type: 'showQuestion' });
      game.apply({ type: 'releasePrompt' });
      last = game.apply({ type: 'closeQuestion' });
    }
    expect(last.sfx).toBe('bonus');
    const view = game.view('admin', null);
    expect(view.doubled).toBe(true);
    expect(view.categories[2]!.tiles[0]!.value).toBe(200);
  });

  it('zeigt Bonusfragen auf dem Board erst nach dem Spielen', () => {
    const { game } = setup();
    expect(game.view('admin', null).categories[0]!.tiles[3]!.bonus).toBe(false);
    open(game, 3);
    game.apply({ type: 'closeQuestion' });
    expect(game.view('admin', null).categories[0]!.tiles[3]!.bonus).toBe(true);
  });

  it('räumt beim Entfernen des aktiven Spielers auf', () => {
    const { game, a, b } = setup();
    game.apply({ type: 'kick', playerId: a.id });
    expect(game.players).toEqual([b]);
    expect(game.activePlayerId).toBe(b.id);
  });
});

describe('YouTube-Links', () => {
  it.each([
    'https://www.youtube.com/watch?v=abcdefghijk',
    'https://www.youtube.com/watch?t=10&v=abcdefghijk',
    'https://youtu.be/abcdefghijk?si=xyz',
    'https://www.youtube.com/embed/abcdefghijk?controls=1',
    'https://www.youtube.com/shorts/abcdefghijk',
  ])('erkennt %s', (url) => {
    expect(youtubeId(url)).toBe('abcdefghijk');
  });

  it('weist andere Seiten ab', () => {
    expect(youtubeId('https://example.com/video')).toBeNull();
  });
});

describe('Katalog', () => {
  it('hat fünf Kategorien mit je fünf Fragen', () => {
    expect(CATALOG.map((c) => c.questions.length)).toEqual([5, 5, 5, 5, 5]);
  });

  it('gibt jeder Kartenfrage ein Ziel', () => {
    const maps = CATALOG.flatMap((c) => c.questions).filter((q) => q.mode === 'map');
    expect(maps).toHaveLength(5);
    expect(maps.every((q) => q.map?.goal)).toBe(true);
  });
});
