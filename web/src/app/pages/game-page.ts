import { Component, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GameService } from '../core/game.service';
import { Board } from '../game/board';
import { Finished } from '../game/finished';
import { HostCard } from '../game/host-card';
import { Lobby } from '../game/lobby';
import { PlayerBar } from '../game/player-bar';
import { QuestionStage } from '../game/question-stage';

const BACKGROUND_VIDEO =
  'https://www.youtube.com/embed/mT7NNpyci1Q?controls=0&autoplay=1&mute=1&loop=1&playlist=mT7NNpyci1Q&vq=hd1080';

@Component({
  selector: 'app-game-page',
  imports: [Board, Finished, HostCard, Lobby, PlayerBar, QuestionStage],
  template: `
    @if (game.view(); as view) {
      <iframe class="background" [src]="background" title="Hintergrundvideo" allow="autoplay" tabindex="-1"></iframe>
      <div class="shell">
        <app-host-card class="host" />
        <section class="stage">
          @switch (view.phase) {
            @case ('lobby') {
              <app-lobby />
            }
            @case ('board') {
              <app-board />
            }
            @case ('question') {
              <app-question-stage />
            }
            @case ('finished') {
              <app-finished />
            }
          }
        </section>
        <app-player-bar class="players" />
      </div>

      @if (!game.connected()) {
        <div class="banner" role="status">Verbindung verloren, verbinde neu ...</div>
      }
      @if (game.soundBlocked()) {
        <button class="primary sound" (click)="game.unlockSound()">Ton aktivieren</button>
      }
      @if (game.notice()) {
        <button class="danger toast" (click)="game.notice.set('')">{{ game.notice() }}</button>
      }
    } @else {
      <p class="wait">{{ failed() ? 'Sitzung nicht gefunden.' : 'Verbinde ...' }}</p>
    }
  `,
  styleUrl: './game-page.scss',
})
export class GamePage {
  protected readonly game = inject(GameService);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);

  readonly code = input.required<string>();

  protected readonly failed = signal(false);
  protected readonly background = this.sanitizer.bypassSecurityTrustResourceUrl(BACKGROUND_VIDEO);

  constructor() {
    effect(() => {
      const code = this.code();
      if (this.game.view()?.code === code) return;
      void this.game.open(code).then((found) => {
        if (found) return;
        this.failed.set(true);
        void this.router.navigate(['/'], { queryParams: { code } });
      });
    });
  }
}
