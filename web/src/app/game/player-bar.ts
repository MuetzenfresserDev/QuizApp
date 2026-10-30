import { Component, computed, inject } from '@angular/core';
import { MAX_PLAYERS, type PlayerView } from '@quiz/shared';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-player-bar',
  template: `
    @for (slot of slots(); track $index) {
      <article class="slot" [class.active]="slot && slot.id === game.view()?.activePlayerId" [class.offline]="slot && !slot.connected">
        <header>
          @if (slot) {
            <img [src]="'assets/geo/' + slot.icon" alt="" />
            <strong class="name">{{ slot.name }}</strong>
            <span class="gold">{{ slot.points }} Gold</span>
            <span class="jokers">
              <button class="joker" [class.on]="slot.jokers.block" [disabled]="!game.isAdmin()" title="Block-Joker" (click)="joker(slot, 'block')">&#8856;</button>
              <button class="joker" [class.on]="slot.jokers.double" [disabled]="!game.isAdmin()" title="Doppel-Joker" (click)="joker(slot, 'double')">2&times;</button>
            </span>
          } @else {
            <span class="muted">Freier Platz</span>
          }
        </header>
        <div class="cam" [attr.aria-label]="'Platzhalter für Kamera ' + ($index + 1)">
          @if (slot && !slot.connected) {
            <span class="muted">Getrennt</span>
          }
          @if (slot && game.isAdmin()) {
            <footer>
            <button (click)="points(slot, -100)">-100</button>
            <button (click)="points(slot, -50)">-50</button>
            <button (click)="points(slot, 50)">+50</button>
            <button (click)="points(slot, 100)">+100</button>
            @if (game.run(); as run) {
              <button class="primary" (click)="points(slot, run.value)">+{{ run.value }}</button>
              <button (click)="points(slot, -run.value)">-{{ run.value }}</button>
            }
            <button class="quiet" title="Am Zug" (click)="game.act({ type: 'setActive', playerId: slot.id })">Zug</button>
            <button class="quiet" title="Gold zurücksetzen" (click)="reset(slot)">0</button>
            <button class="quiet" title="Entfernen" (click)="kick(slot)">&times;</button>
            </footer>
          }
        </div>
      </article>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: 1vw;
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .slot {
      background: var(--panel);
      border: 2px solid var(--line);
      border-radius: var(--radius);
      display: flex;
      flex-direction: column;
      gap: 0.3vh;
      min-height: 0;
      padding: 0.5vh 0.5vw;
    }
    .slot.active {
      border-color: var(--gold-strong);
      box-shadow: 0 0 12px var(--gold);
    }
    .slot.offline {
      opacity: 0.6;
    }
    header {
      align-items: center;
      display: flex;
      gap: 0.4rem;
      min-height: 1.8rem;
    }
    header img {
      border-radius: 50%;
      height: 1.6rem;
      width: 1.6rem;
    }
    .name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .name {
      font-size: 1.15em;
    }
    .gold {
      color: var(--gold-strong);
      font-size: 1.2em;
      font-weight: bold;
      white-space: nowrap;
    }
    .jokers {
      display: flex;
      gap: 0.2rem;
      margin-left: auto;
    }
    .joker {
      background: transparent;
      opacity: 0.35;
      padding: 0 0.35em;
    }
    .joker.on {
      background: var(--danger);
      opacity: 1;
    }
    .cam {
      align-items: center;
      background: rgba(0, 0, 0, 0.55);
      border-radius: 4px;
      display: flex;
      flex: 1;
      justify-content: center;
      min-height: 0;
      position: relative;
    }
    /* Liegt im Kamerabild: In OBS deckt die Kamera die Knöpfe für die Zuschauer ab. */
    footer {
      bottom: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.15rem;
      left: 0;
      padding: 0.2rem;
      position: absolute;
      right: 0;
    }
    footer button {
      font-size: 0.72em;
      padding: 0.1em 0.3em;
    }
  `,
})
export class PlayerBar {
  protected readonly game = inject(GameService);

  /** Immer vier Plätze, damit die Kamera-Positionen in OBS stabil bleiben. */
  protected readonly slots = computed<(PlayerView | null)[]>(() => {
    const players = this.game.view()?.players ?? [];
    return Array.from({ length: MAX_PLAYERS }, (_, index) => players[index] ?? null);
  });

  protected points(player: PlayerView, delta: number): void {
    this.game.act({ type: 'points', playerId: player.id, delta });
  }

  protected joker(player: PlayerView, joker: 'block' | 'double'): void {
    this.game.act({ type: 'toggleJoker', playerId: player.id, joker });
  }

  protected reset(player: PlayerView): void {
    if (confirm(`Gold von ${player.name} zurücksetzen?`)) this.game.act({ type: 'resetPoints', playerId: player.id });
  }

  protected kick(player: PlayerView): void {
    if (confirm(`${player.name} aus dem Spiel entfernen?`)) this.game.act({ type: 'kick', playerId: player.id });
  }
}
