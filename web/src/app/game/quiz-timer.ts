import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { TIMER_SECONDS } from '@quiz/shared';
import { GameService } from '../core/game.service';

const WARNING_SECONDS = 10;

@Component({
  selector: 'app-quiz-timer',
  template: `
    @if (game.isAdmin()) {
      <button class="quiet" (click)="game.act({ type: 'timerReset' })">Zurücksetzen</button>
      @if (running()) {
        <button (click)="game.act({ type: 'timerPause' })">Pause</button>
      } @else {
        <button [disabled]="seconds() === 0" (click)="game.act({ type: 'timerStart' })">Timer starten</button>
      }
    }
    <div class="ring" [class.low]="seconds() <= warning" role="timer">
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <circle class="track" cx="18" cy="18" r="16" pathLength="100" />
        <circle class="progress" cx="18" cy="18" r="16" pathLength="100" [attr.stroke-dasharray]="percent() + ' 100'" />
      </svg>
      <span>{{ seconds() }}</span>
    </div>
  `,
  styles: `
    :host {
      align-items: center;
      display: flex;
      gap: 0.4rem;
    }
    .ring {
      display: grid;
      height: 3em;
      place-items: center;
      width: 3em;
    }
    .ring > * {
      grid-area: 1 / 1;
    }
    svg {
      height: 100%;
      transform: rotate(-90deg);
      width: 100%;
    }
    circle {
      fill: none;
      stroke-width: 3;
    }
    .track {
      fill: rgba(14, 11, 8, 0.7);
      stroke: var(--line);
    }
    .progress {
      stroke: var(--gold);
      stroke-linecap: round;
      transition:
        stroke 0.3s,
        stroke-dasharray 0.25s linear;
    }
    span {
      color: var(--gold-strong);
      font-family: var(--font-display);
      font-size: 1.15em;
      font-variant-numeric: tabular-nums;
      font-weight: 700;
    }
    .ring.low .progress {
      stroke: #ff6a4d;
    }
    .ring.low span {
      color: #ff8a70;
    }
  `,
})
export class QuizTimer implements OnInit, OnDestroy {
  protected readonly game = inject(GameService);
  protected readonly warning = WARNING_SECONDS;

  private readonly tick = signal(0);
  private interval: ReturnType<typeof setInterval> | undefined;
  private warned = false;

  protected readonly running = computed(() => this.game.run()?.timer.running ?? false);

  private readonly remainingMs = computed(() => {
    this.tick();
    const timer = this.game.run()?.timer;
    if (!timer) return 0;
    return Math.max(0, timer.endsAt === null ? timer.remainingMs : timer.endsAt - this.game.serverNow());
  });

  protected readonly seconds = computed(() => Math.ceil(this.remainingMs() / 1000));
  protected readonly percent = computed(() => (this.remainingMs() / (TIMER_SECONDS * 1000)) * 100);

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.tick.update((value) => value + 1);
      const seconds = this.seconds();
      if (seconds > WARNING_SECONDS) this.warned = false;
      if (this.running() && seconds === WARNING_SECONDS && !this.warned) {
        this.warned = true;
        this.game.playSound('assets/timer/timer.mp3');
      }
    }, 250);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
