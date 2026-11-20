import { Component, inject, signal } from '@angular/core';
import { MAX_PLAYERS } from '@quiz/shared';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-lobby',
  template: `
    @if (game.view(); as view) {
      <div class="panel lobby">
        <p class="eyebrow">Spiel-Code</p>
        <p class="code">{{ view.code }}</p>

        <ul class="roster" aria-label="Beigetretene Spieler">
          @for (player of view.players; track player.id) {
            <li>
              <img [src]="'assets/geo/' + player.icon" alt="" />
              {{ player.name }}
            </li>
          }
        </ul>
        <p class="muted">{{ view.players.length }} von {{ maxPlayers }} Spielern{{ view.players.length === maxPlayers ? ', das Spiel ist voll' : '' }}</p>

        @if (game.isAdmin()) {
          <div class="actions">
            <button (click)="copy(view.code)">{{ copied() ? 'Kopiert' : 'Einladungslink kopieren' }}</button>
            <button class="primary" [disabled]="view.players.length === 0" (click)="game.act({ type: 'start' })">Spiel starten</button>
          </div>
        } @else {
          <p class="muted">Warte auf den Start durch {{ view.hostName }} ...</p>
        }
      </div>
    }
  `,
  styles: `
    :host {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;
    }
    .lobby {
      animation: rise-in 0.5s ease-out backwards;
      display: grid;
      gap: 1rem;
      justify-items: center;
      max-width: 100%;
      padding: 2rem 3rem;
    }
    .eyebrow {
      color: var(--gold);
      font-size: 0.85em;
      font-weight: 600;
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
    .code {
      background: var(--gold-gradient);
      background-clip: text;
      color: transparent;
      font-family: var(--font-display);
      font-size: 5em;
      font-weight: 700;
      letter-spacing: 0.15em;
      line-height: 1;
      margin-right: -0.15em;
    }
    .roster {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      align-items: center;
      animation: pop-in 0.3s ease-out;
      background: var(--surface-raised);
      border: 1px solid var(--line-strong);
      border-radius: 10px;
      display: flex;
      font-weight: 600;
      gap: 0.4rem;
      min-height: 2.6em;
      min-width: 7rem;
      overflow-wrap: anywhere;
      padding: 0.3em 0.6em;
    }
    li img {
      border-radius: 50%;
      height: 1.6em;
      width: 1.6em;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      justify-content: center;
    }
  `,
})
export class Lobby {
  protected readonly game = inject(GameService);
  protected readonly copied = signal(false);

  protected readonly maxPlayers = MAX_PLAYERS;

  protected async copy(code: string): Promise<void> {
    await navigator.clipboard.writeText(`${location.origin}/?code=${code}`);
    this.copied.set(true);
  }
}
