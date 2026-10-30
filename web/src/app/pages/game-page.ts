import { Component, OnInit, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GameService } from '../core/game.service';
import { Board } from '../game/board';
import { HostCard } from '../game/host-card';
import { Lobby } from '../game/lobby';
import { PlayerBar } from '../game/player-bar';
import { QuestionStage } from '../game/question-stage';

const BACKGROUND_VIDEO =
  'https://www.youtube.com/embed/mT7NNpyci1Q?controls=0&autoplay=1&mute=1&loop=1&playlist=mT7NNpyci1Q&vq=hd1080';

@Component({
  selector: 'app-game-page',
  imports: [Board, HostCard, Lobby, PlayerBar, QuestionStage],
  template: `
    @if (game.view(); as view) {
      <iframe class="background" [src]="background" title="Hintergrundvideo" allow="autoplay" tabindex="-1"></iframe>
      <div class="vignette"></div>
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
          }
        </section>
        <app-player-bar class="players" />
      </div>

      @if (!game.connected()) {
        <div class="banner" role="status">Verbindung verloren, verbinde neu ...</div>
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
export class GamePage implements OnInit {
  protected readonly game = inject(GameService);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly failed = signal(false);
  protected readonly background = this.sanitizer.bypassSecurityTrustResourceUrl(BACKGROUND_VIDEO);

  async ngOnInit(): Promise<void> {
    if (this.game.view() || (await this.game.open())) return;
    this.failed.set(true);
    await this.router.navigate(['/']);
  }
}
