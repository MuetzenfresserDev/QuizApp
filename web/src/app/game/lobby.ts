import { Component, inject, signal } from '@angular/core';
import { MAX_PLAYERS } from '@quiz/shared';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-lobby',
  template: `
    @if (game.view(); as view) {
      <div class="panel lobby">
        <p class="muted">Spiel-Code</p>
        <p class="code">{{ view.code }}</p>
        <p class="muted">{{ view.players.length }} von {{ max }} Spielern</p>
        @if (game.isAdmin()) {
          <div class="actions">
            <button (click)="copy(view.code)">{{ copied() ? 'Kopiert' : 'Einladungslink kopieren' }}</button>
            <button class="primary" [disabled]="view.players.length === 0" (click)="game.act({ type: 'start' })">Spiel starten</button>
          </div>
        } @else {
          <p>Warte auf den Start durch {{ view.hostName }} ...</p>
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
      display: grid;
      gap: 0.6rem;
      justify-items: center;
      padding: 2rem 3rem;
    }
    .code {
      color: var(--gold-strong);
      font-size: 4rem;
      letter-spacing: 0.2em;
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
  protected readonly max = MAX_PLAYERS;
  protected readonly copied = signal(false);

  protected async copy(code: string): Promise<void> {
    await navigator.clipboard.writeText(`${location.origin}/?code=${code}`);
    this.copied.set(true);
  }
}
