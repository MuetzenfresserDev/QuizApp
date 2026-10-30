import { Component, HostListener, computed, inject } from '@angular/core';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-buzzer',
  template: `
    <p class="buzzed" role="status">{{ buzzedName() ? buzzedName() + ' hat gebuzzert!' : ' ' }}</p>

    @if (game.isAdmin()) {
      <div class="admin">
        <button class="primary" (click)="game.act({ type: 'buzzerRelease' })">Buzzer freigeben</button>
        <button [disabled]="!buzzedName()" (click)="game.act({ type: 'buzzerFreezeBuzzed' })">Spieler einfrieren</button>
        <button (click)="game.act({ type: 'buzzerFreezeAll' })">Alle einfrieren</button>
      </div>
    } @else {
      <button class="buzzer" [class.ready]="ready()" [class.mine]="mine()" [disabled]="!ready()" aria-label="Buzzer" (click)="game.buzz()">
        {{ mine() ? 'Du bist dran!' : ready() ? 'BUZZ' : 'Gesperrt' }}
      </button>
      <p class="muted">Leertaste oder Enter</p>
    }
  `,
  styles: `
    :host {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      justify-content: center;
    }
    .buzzed {
      color: var(--gold-strong);
      font-size: 1.8em;
      font-weight: bold;
      text-align: center;
    }
    .admin {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      justify-content: center;
    }
    .buzzer {
      aspect-ratio: 1;
      background: #4b4436;
      border: 6px solid #000;
      border-radius: 50%;
      font-size: 1.6em;
      font-weight: bold;
      max-height: 34vh;
      width: min(100%, 34vh);
    }
    .buzzer:disabled {
      color: var(--muted);
      opacity: 1;
    }
    .buzzer.ready {
      background: var(--danger);
      opacity: 1;
    }
    .buzzer.ready:active {
      transform: translateY(3px);
    }
    .buzzer.mine {
      background: var(--ok);
      color: var(--text);
    }
  `,
})
export class Buzzer {
  protected readonly game = inject(GameService);

  private readonly state = computed(() => this.game.run()?.buzzer ?? null);

  protected readonly buzzedName = computed(() => {
    const id = this.state()?.buzzedId;
    return this.game.view()?.players.find((player) => player.id === id)?.name ?? null;
  });

  protected readonly mine = computed(() => {
    const id = this.game.view()?.selfId;
    return !!id && this.state()?.buzzedId === id;
  });

  protected readonly ready = computed(() => {
    const state = this.state();
    const id = this.game.view()?.selfId;
    return !!state && !!id && !state.buzzedId && !state.frozenIds.includes(id);
  });

  @HostListener('document:keydown', ['$event'])
  protected onKey(event: KeyboardEvent): void {
    if ((event.key !== ' ' && event.key !== 'Enter') || event.repeat || !this.ready()) return;
    event.preventDefault();
    this.game.buzz();
  }
}
