import { Component, OnInit } from '@angular/core';
import { ConstQuestions } from 'src/app/constQuestions';
import { ErrorQuestion, GeoguessrQuestion, GuessingQuestion, MultiplechoiceQuestion, VoicelineQuestion } from 'src/app/interfaces/question';
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
  voicelineQuestions: VoicelineQuestion[] = [];
  errorQuestions: ErrorQuestion[] = [];
  geoQuestions: GeoguessrQuestion[] = [];
  guessingQuestions: GuessingQuestion[] = [];
  points: number[] = [100, 200, 300, 400, 500];
  concatQuestions: any[] = [];
  images: any[] = [];

  usedQuestionColors: string[][] = [];

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.setupBoard();
  }

  private setupBoard() {
    this.setupMulitpleChoiceQuestions();
    this.setupErrorSearches();
    this.setupVoiceLines();
    this.setupGeoguesserQuestions();
    this.setupGuessingQuestions();
    this.setupConcatQuestions();
  }

  private setupMulitpleChoiceQuestions() {
    this.multiplechoiceQuestions = ConstQuestions.multiplechoiceQuestions;
  }

  private setupGuessingQuestions(){
    this.guessingQuestions = ConstQuestions.guessingQuestions;
  }

  private setupErrorSearches() {
    this.errorQuestions = ConstQuestions.errorQuestions;
  }

  private setupVoiceLines() {
    this.voicelineQuestions = ConstQuestions.voicelineQuestions;
  }

  private setupGeoguesserQuestions() {
    this.geoQuestions = ConstQuestions.geoQuestions;
  }

  private setupConcatQuestions() {
    this.concatQuestions = [
      this.multiplechoiceQuestions,
      this.voicelineQuestions,
      this.errorQuestions,
      this.geoQuestions,
      this.guessingQuestions
    ];

    this.images = ['filter_4','graphic_eq','error_outline','push_pin','help_outline']

    for (let i = 0; i < this.concatQuestions.length; i++) {
      const row = [];
      for (let j = 0; j < this.concatQuestions[i].length; j++) {
        row.push("primary");
      }
      this.usedQuestionColors.push(row);
    }

  }

  public onClickOpenDialog(item: any, i: number, j: number) {

    let dialogData: DialogData<DialogComponent> = {
      component: DialogComponent,
      data: {
        'Data': item
      },
    }

    let ref = this.dialogService.openDialog(dialogData);

    ref.afterClosed().subscribe(()=>{
      this.usedQuestionColors[i][j] = "grey";
    })

  }
}
