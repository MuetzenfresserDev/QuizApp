import { Component, inject } from '@angular/core';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-host-card',
  template: `
    @if (game.view(); as view) {
      <div class="cam" aria-label="Platzhalter für die Host-Kamera"></div>
      <h3>Host: {{ view.hostName }}</h3>
      <p class="muted">Fragen gespielt: {{ view.playedCount }}</p>
      @if (view.doubled) {
        <p class="double">Doppeltes Gold!</p>
      }
      @if (game.isAdmin() && view.phase !== 'finished' && view.phase !== 'lobby') {
        <button class="quiet" (click)="finish()">Spiel beenden</button>
      }
    }
  `,
  styles: `
    :host {
      text-shadow: 0 1px 3px #000;
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      overflow: hidden;
      text-align: center;
    }
    .cam {
      aspect-ratio: 16 / 9;
      background: rgba(0, 0, 0, 0.45);
      border: 2px solid var(--line);
      border-radius: var(--radius);
      flex: none;
      width: 100%;
    }
    h3 {
      margin-top: 0.3rem;
    }
    .double {
      color: var(--gold-strong);
      font-weight: bold;
    }
  `,
})
export class HostCard {
  protected readonly game = inject(GameService);

  protected finish(): void {
    if (confirm('Spiel wirklich beenden?')) this.game.act({ type: 'finish' });
  }
}
