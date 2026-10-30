import { Component, HostListener, computed, inject } from '@angular/core';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-buzzer',
  template: `
    <p class="buzzed" [class.shown]="buzzedName()" role="status">
      @if (buzzedName(); as name) {
        <strong>{{ name }}</strong> hat gebuzzert!
      } @else {
        {{ ' ' }}
      }
    </p>

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
      gap: 0.8rem;
      justify-content: center;
    }
    .buzzed {
      color: var(--gold-strong);
      font-size: 1.7em;
      min-height: 1.4em;
      text-align: center;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);
    }
    .buzzed.shown {
      animation: pop-in 0.3s ease-out;
    }
    .buzzed strong {
      font-family: var(--font-display);
    }
    .admin {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
    }
    .buzzer {
      aspect-ratio: 1;
      background: radial-gradient(circle at 35% 30%, #5d5345, #2a241b 70%);
      border: 0.4em solid #15100a;
      border-radius: 50%;
      box-shadow:
        0 12px 30px rgba(0, 0, 0, 0.6),
        inset 0 -6px 14px rgba(0, 0, 0, 0.5);
      font-family: var(--font-display);
      font-size: 1.6em;
      font-weight: 700;
      max-height: 34vh;
      width: min(100%, 34vh);
    }
    .buzzer:disabled {
      color: var(--muted);
      opacity: 1;
    }
    .buzzer.ready {
      animation: buzzer-ready 1.6s ease-in-out infinite;
      background: radial-gradient(circle at 35% 30%, #ff7a5c, #c62d17 60%, #7d1408);
      color: #fff;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    }
    .buzzer.ready:hover:not(:disabled) {
      background: radial-gradient(circle at 35% 30%, #ff8d72, #d63620 60%, #861709);
      transform: scale(1.02);
    }
    .buzzer.ready:active:not(:disabled) {
      transform: translateY(4px) scale(0.98);
    }
    .buzzer.mine {
      background: radial-gradient(circle at 35% 30%, #7fe09a, #2e9150 60%, #17542c);
      box-shadow: 0 0 40px rgba(90, 220, 130, 0.65);
      color: #fff;
    }
    @keyframes buzzer-ready {
      50% {
        box-shadow:
          0 0 44px rgba(255, 90, 60, 0.7),
          inset 0 -6px 14px rgba(0, 0, 0, 0.5);
      }
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
