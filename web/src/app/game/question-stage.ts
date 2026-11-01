import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { type PlayerView } from '@quiz/shared';
import { GameService } from '../core/game.service';
import { Buzzer } from './buzzer';
import { GeoMap } from './geo-map';
import { MediaPlayer } from './media-player';
import { QuizTimer } from './quiz-timer';
import { Whiteboard } from './whiteboard';
import { ZoomImage } from './zoom-image';

/** Eine offene Frage. Die Admin-Ansicht wird gestreamt und zeigt außer den Whiteboards nur Aufgedecktes. */
@Component({
  selector: 'app-question-stage',
  imports: [Buzzer, GeoMap, MediaPlayer, NgTemplateOutlet, QuizTimer, Whiteboard, ZoomImage],
  templateUrl: './question-stage.html',
  styleUrl: './question-stage.scss',
})
export class QuestionStage {
  protected readonly game = inject(GameService);
  protected readonly run = this.game.run;

  protected readonly selfId = computed(() => this.game.view()?.selfId ?? null);
  protected readonly players = computed<PlayerView[]>(() => this.game.view()?.players ?? []);
  protected readonly categoryName = computed(() => this.game.view()?.categories[this.run()?.category ?? 0]?.name ?? '');

  protected readonly canDraw = computed(() => {
    const run = this.run();
    return !!run && run.mode === 'whiteboard' && run.questionVisible && !run.boardsLocked && !!this.selfId();
  });
}
