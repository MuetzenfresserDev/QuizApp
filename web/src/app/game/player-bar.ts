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
            @for (points of [slot.points]; track points) {
              <span class="gold">{{ points }}</span>
            }
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
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      display: flex;
      flex-direction: column;
      gap: 0.4vh;
      min-height: 0;
      padding: 0.5vh 0.5vw;
      transition:
        border-color 0.3s,
        box-shadow 0.3s;
    }
    .slot.active {
      animation: active-glow 2.4s ease-in-out infinite;
      border-color: var(--gold-strong);
    }
    .slot.offline {
      opacity: 0.55;
    }
    @keyframes active-glow {
      50% {
        box-shadow:
          0 0 22px rgba(255, 201, 110, 0.6),
          inset 0 0 12px rgba(255, 201, 110, 0.12);
      }
    }
    header {
      align-items: center;
      display: flex;
      gap: 0.4rem;
      min-height: 1.8rem;
    }
    header img {
      border: 1px solid var(--gold);
      border-radius: 50%;
      height: 1.9rem;
      object-fit: cover;
      width: 1.9rem;
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
      animation: pop-in 0.35s ease-out;
      background: var(--gold-gradient);
      background-clip: text;
      color: transparent;
      font-family: var(--font-display);
      font-size: 1.45em;
      font-weight: 700;
      line-height: 1;
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
      background: rgba(0, 0, 0, 0.6);
      border-radius: calc(var(--radius) - 4px);
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
