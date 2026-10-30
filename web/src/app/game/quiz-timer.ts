import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { GameService } from '../core/game.service';

const WARNING_SECONDS = 10;

@Component({
  selector: 'app-quiz-timer',
  template: `
    <span class="time" [class.low]="seconds() <= warning" role="timer">{{ seconds() }}s</span>
    @if (game.isAdmin()) {
      @if (running()) {
        <button (click)="game.act({ type: 'timerPause' })">Pause</button>
      } @else {
        <button [disabled]="seconds() === 0" (click)="game.act({ type: 'timerStart' })">Timer starten</button>
      }
      <button class="quiet" (click)="game.act({ type: 'timerReset' })">Zurücksetzen</button>
    }
  `,
  styles: `
    :host {
      align-items: center;
      display: flex;
      gap: 0.4rem;
    }
    .time {
      color: var(--gold-strong);
      font-size: 1.8em;
      font-variant-numeric: tabular-nums;
      font-weight: bold;
    }
    .time.low {
      color: #ff7a66;
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

  protected readonly seconds = computed(() => {
    this.tick();
    const timer = this.game.run()?.timer;
    if (!timer) return 0;
    const remaining = timer.endsAt === null ? timer.remainingMs : timer.endsAt - this.game.serverNow();
    return Math.max(0, Math.ceil(remaining / 1000));
  });

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
