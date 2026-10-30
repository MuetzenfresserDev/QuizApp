import { describe, expect, it } from 'vitest';
import type { CategoryDef } from './catalog.js';
import { CATALOG } from './catalog.js';
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
    ],
  },
];

function setup(clock = { now: 1000 }) {
  const game = new Game('1234', 'Host', catalog, () => clock.now);
  const a = game.join('Anna');
  const b = game.join('Ben');
  game.connect(a);
  game.connect(b);
  game.apply({ type: 'start' });
  return { game, a, b, clock };
}

const open = (game: Game, row: number) => {
  game.apply({ type: 'openQuestion', category: 0, row });
  game.apply({ type: 'showQuestion' });
};

describe('Lobby', () => {
  it('lehnt doppelte Namen ab, solange der Spieler verbunden ist', () => {
    const { game } = setup();
    expect(() => game.join('anna')).toThrow(GameError);
  });

  it('gibt einem getrennten Spieler seinen Platz zurück', () => {
    const { game, a } = setup();
    game.disconnect(a);
    expect(game.join('Anna')).toBe(a);
  });

  it('nimmt maximal vier Spieler auf', () => {
    const { game } = setup();
    game.join('C');
    game.join('D');
    expect(() => game.join('E')).toThrow('voll');
  });

  it('vergibt jedes Icon nur einmal', () => {
    const { game } = setup();
    game.join('C');
    expect(new Set(game.players.map((p) => p.icon)).size).toBe(3);
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

  it('zeigt das Suchbild der Karte erst nach Freigabe', () => {
    const { game, a } = setup();
    open(game, 2);
    expect(game.view('player', a).run!.media.image).toBeUndefined();
    game.apply({ type: 'togglePicture' });
    expect(game.view('player', a).run!.media.image).toBe('such.png');
  });

  it('gibt fremde Whiteboards erst nach dem Aufdecken frei', () => {
    const { game, a, b } = setup();
    open(game, 1);
    game.addStroke(a, { id: '1', color: '#111111', width: 0.008, points: [{ x: 0, y: 0 }] });
    expect(game.visibleBoards(b)[a.id]).toBeUndefined();
    expect(game.visibleBoards(null)[a.id]).toBeUndefined();
    game.apply({ type: 'revealBoard', playerId: a.id });
    expect(game.visibleBoards(b)[a.id]).toHaveLength(1);
  });

  it('gibt dem Imposter sein eigenes Board-Bild und verrät es nicht vorab', () => {
    const { game, a, b } = setup();
    open(game, 1);
    expect(game.view('player', a).run!.boardImages).toEqual({ [a.id]: 'normal.png' });
    expect(game.view('player', b).run!.boardImages).toEqual({ [b.id]: 'imposter.png' });
  });
});

describe('Buzzer', () => {
  const release = (game: Game) => {
    open(game, 0);
    game.apply({ type: 'buzzerRelease' });
  };

  it('ist am Anfang für alle gesperrt', () => {
    const { game, a } = setup();
    open(game, 0);
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

  it('lässt nach einem Blick ohne Aufdecken weiterzeichnen', () => {
    const { game, a } = setup();
    open(game, 1);
    game.apply({ type: 'showBoards' });
    game.apply({ type: 'hideBoards' });
    expect(game.addStroke(a, stroke)).toBe(true);
  });

  it('bleibt nach dem ersten Aufdecken gesperrt', () => {
    const { game, a } = setup();
    open(game, 1);
    game.apply({ type: 'showBoards' });
    game.apply({ type: 'revealBoard', playerId: a.id });
    game.apply({ type: 'hideBoards' });
    expect(game.addStroke(a, stroke)).toBe(false);
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
    game.apply({ type: 'mapShowPlayers' });
    game.mapPick(a.id, { x: 0.5, y: 0.5 });
    expect(game.view('player', a).run!.map!.myPick).toBeNull();
  });
});

describe('Medien und Timer', () => {
  it('rechnet die Position beim Pausieren fort', () => {
    const { game, clock } = setup();
    open(game, 1);
    game.apply({ type: 'mediaPlay', target: 'question', kind: 'video' });
    clock.now += 4000;
    game.apply({ type: 'mediaPause' });
    expect(game.run!.playback).toMatchObject({ playing: false, positionSec: 4 });
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
    open(game, 0);
    game.apply({ type: 'closeQuestion' });
    expect(game.activePlayerId).toBe(b.id);
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
