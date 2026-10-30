import { Component, inject } from '@angular/core';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-host-card',
  template: `
    @if (game.view(); as view) {
      <div class="cam" aria-label="Platzhalter für die Host-Kamera"></div>
      <p class="role">Host</p>
      <h3>{{ view.hostName }}</h3>
      <p class="stat"><strong>{{ view.playedCount }}</strong> {{ view.playedCount === 1 ? 'Frage' : 'Fragen' }} gespielt</p>
      @if (view.doubled) {
        <p class="double">Doppeltes Gold!</p>
      }
    }
  `,
  styles: `
    :host {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      overflow: hidden;
      text-align: center;
      text-shadow: 0 2px 6px #000;
    }
    .cam {
      aspect-ratio: 16 / 9;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid var(--line-strong);
      border-radius: var(--radius);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
      flex: none;
      margin-bottom: 0.4rem;
      width: 100%;
    }
    .role {
      color: var(--gold);
      font-size: 0.75em;
      font-weight: 600;
      letter-spacing: 0.25em;
      text-transform: uppercase;
    }
    h3 {
      font-size: 1.3em;
      line-height: 1.1;
      overflow-wrap: anywhere;
    }
    .stat {
      color: var(--muted);
      font-size: 0.9em;
      margin-top: 0.3rem;
    }
    .stat strong {
      color: var(--text);
    }
    .double {
      animation: pop-in 0.4s ease-out;
      background: var(--gold-gradient);
      border-radius: 999px;
      color: #2b1d07;
      font-size: 0.9em;
      font-weight: 700;
      margin-top: 0.3rem;
      padding: 0.1em 0.8em;
      text-shadow: none;
    }
  `,
})
export class HostCard {
  protected readonly game = inject(GameService);
}
