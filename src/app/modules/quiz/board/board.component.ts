import { Component, OnInit } from '@angular/core';
import { ConstQuestions } from 'src/app/constQuestions';
import { MultiplechoiceQuestion } from 'src/app/interfaces/question';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogData } from 'src/app/interfaces/dialogData';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  //Buzzerfragen
  //Fehlersuche
  //NPS-Voiceline
  //Marvin
  //Trivia/Lore
  //Geoguesser

  //Von allen fragen 5 Fragen oder so Punkte: 100/200/300/400/500

  multiplechoiceQuestions: MultiplechoiceQuestion[] = [];
  points: number[] = [100, 200, 300, 400, 500];
  concatQuestions: any[] = [];
  images: any[] = [];

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.setupBoard();
  }

  private setupBoard() {
    this.setupMulitpleChoiceQuestions();
    this.setupBuzzerQuestions();
    this.setupErrorSeraches();
    this.setupVoiceLines();
    this.setupMarvinQuestions();
    this.setupLoreQuestions();
    this.setupGeoguesserQuestions();
    this.setupConcatQuestions();
  }

  private setupMulitpleChoiceQuestions() {
    this.multiplechoiceQuestions = ConstQuestions.multiplechoiceQuestions;
    console.log(this.multiplechoiceQuestions);
  }

  private setupBuzzerQuestions() {}

  private setupErrorSeraches() {}

  private setupVoiceLines() {}

  private setupMarvinQuestions() {}

  private setupLoreQuestions() {}

  private setupGeoguesserQuestions() {}

  private setupConcatQuestions() {
    this.concatQuestions = [
      this.multiplechoiceQuestions,
      this.multiplechoiceQuestions,
      this.multiplechoiceQuestions,
      this.multiplechoiceQuestions,
      this.multiplechoiceQuestions,
    ];

    this.images = ['Kat1','Kat2','Kat3','Kat4','Kat5']

  }

  public onClickOpenDialog(item: any) {

    let dialogData: DialogData<DialogComponent> = {
      component: DialogComponent,
      data: {
        'Data': item
      },
    }

    this.dialogService.openDialog(dialogData);
  }
}
