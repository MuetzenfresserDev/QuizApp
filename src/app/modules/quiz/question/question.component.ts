import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConstQuestions } from 'src/app/constQuestions';
import { ErrorPictureComponent } from './errorPicture/errorPicture.component';
import { GeogeussrComponent } from './geogeussr/geogeussr.component';
import { GuessingComponent } from './guessing/guessing.component';
import { PlayerNameService } from 'src/app/services/playerName/playerName.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VoicelineComponent } from './voiceline/voiceline.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() data: any;
  @Input() playerCount: any = [];
  @Input() setWidth: string = '';

  @ViewChild(ErrorPictureComponent) errorPicture: ErrorPictureComponent | undefined;
  @ViewChild(GeogeussrComponent) geoguessr: GeogeussrComponent | undefined;
  @ViewChild(GuessingComponent) guessing: GuessingComponent | undefined;

  showAnswer: boolean = false;
  showButtons: boolean = false;
  showLButton: boolean = false;

  cardStyle = {
    width: '100%',
    height: '100%'
  }

  visibleBoard = {
    display: 'none'
  }

  visibleWaiting = {
    display: 'block'
  }

  whiteboardUrls: string[] = ConstQuestions.whiteboardUrls;

  blockNames: string[] = ['picA','picB','picC','picD',]

  timer: { multivoice:number, errorgeo:number, guess:number} = ConstQuestions.timers;

  audio: HTMLAudioElement | undefined;

  playerNames: string[] = [];

  hideQuestion: boolean = false;

  youtubeQuestion: SafeResourceUrl | undefined;
  videoSize: {width: string, height: string} = ConstQuestions.videoSize; 
  pictureSize: {width: string, height: string} = ConstQuestions.pictureSize;
  showQuestionVideo: boolean = true;
  showQuestionPicture: boolean = true;

  voiceVideo: SafeResourceUrl | undefined;

  constructor(private playerNamesService: PlayerNameService, private sanitizer: DomSanitizer) {
    this.audio = new Audio();
   }

  ngOnInit() {

    if(this.data.kind == "Voiceline-Fragen"){
      this.voiceVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.correctAnswer);
    }

    this.setDimension(JSON.parse(sessionStorage.getItem('playerCount')|| '[]').fxFlex);

    console.log(this.data)

    if(this.data.videoQuestion != ''){
      this.youtubeQuestion = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.videoQuestion);
    }

    this.playerNames = this.playerNamesService.playerNames;

    if(this.data.bonus == true){
      this.audio!.src = 'assets/bonus/bonus.mp3';

      setTimeout(() => {
        this.audio?.play();
      }, 100);
 
    }

  }

  private setDimension(n: number){

    if(n == 25){
      this.cardStyle.width = "22vw";
      this.cardStyle.height = "33vh";
    } else if(n == 33){
      this.cardStyle.width = "30vw";
      this.cardStyle.height = "33vh";
    } else {
      this.cardStyle.width = "30vw";
      this.cardStyle.height = "33vh";
    }

  }

  public clickShowAnswer(){
    this.showAnswer = true;
    this.hideQuestion = false;
    this.showQuestionVideo = false;
    this.showQuestionPicture = false;
  }

  public clickShowLButton(){
    this.showLButton = true;
  }

  public clickSwitchPictures(){

    console.log('test')

    this.errorPicture?.switchToCorrected();
    this.geoguessr?.switchToCorrected();
  }

  public hideAnswer(){
    this.errorPicture?.hideAllButWhiteboard();
    this.geoguessr?.hideAllButWhiteboard();
    this.guessing?.hideAllButWhiteboard();
    this.hideQuestion = true;
  }

  public clickShowBoards(){

    this.showQuestionPicture = false;
    this.showQuestionVideo = false;
    this.showButtons = true;

    this.visibleBoard.display = 'block';
    this.visibleWaiting.display = 'none';

    console.log(this.visibleBoard)

  }

  public reverseShowBoards(){
    this.showButtons = false;

    this.visibleBoard.display = 'none';
    this.visibleWaiting.display = 'block';

    console.log(this.visibleBoard)
  }

  public clickHideBoard(){

    this.showButtons = true;

    this.visibleBoard.display = 'none';
    this.visibleWaiting.display = 'block';

    this.showLButton = false;

  }


}
