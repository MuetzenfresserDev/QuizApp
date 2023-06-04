import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AnswerComponent } from './answer/answer.component';
import { MaterialModule } from 'src/app/material';
import { BoardComponent } from './board/board.component';
import { PlayerComponent } from './player/player.component';
import { DialogComponent } from './dialog/dialog.component';
import { MultipleChoiceComponent } from './question/multipleChoice/multipleChoice.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { VoicelineComponent } from './question/voiceline/voiceline.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [
    QuizComponent,
    HeaderComponent,
    FooterComponent,
    AnswerComponent,
    BoardComponent,
    PlayerComponent,
    DialogComponent,
    WhiteboardComponent,
    MultipleChoiceComponent,
    VoicelineComponent,
    QuestionComponent
  ],
  exports: [QuizComponent]
})
export class QuizModule { }
