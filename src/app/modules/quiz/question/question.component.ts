import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConstQuestions } from 'src/app/constQuestions';
import { ErrorPictureComponent } from './errorPicture/errorPicture.component';
import { GeogeussrComponent } from './geogeussr/geogeussr.component';
import { GuessingComponent } from './guessing/guessing.component';
import { PlayerNameService } from 'src/app/services/playerName/playerName.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VoicelineComponent } from './voiceline/voiceline.component';
import { RequestDataService } from 'src/app/services/request/requestData.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() playerCount: any = [];
  @Input() setWidth: string = '';

  @ViewChild(ErrorPictureComponent) errorPicture: ErrorPictureComponent | undefined;
  @ViewChild(GeogeussrComponent) geoguessr: GeogeussrComponent | undefined;
  @ViewChild(GuessingComponent) guessing: GuessingComponent | undefined;
  @ViewChild(VoicelineComponent) voiceline: VoicelineComponent | undefined;

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
  showQuestionVideo: boolean = true;
  showQuestionPicture: boolean = true;

  voiceVideo: SafeResourceUrl | undefined;

  predictionId: string = '';
  correctId: string = '';
  title: string = 'Was denkst du?'

  started: boolean = false;

  auth = ConstQuestions.twitchAuth;

  constructor(private playerNamesService: PlayerNameService, private sanitizer: DomSanitizer, private requestService: RequestDataService) {
    this.audio = new Audio();
   }

  ngOnInit() {

    console.log(this.auth)

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

  ngOnDestroy(): void {
    if(this.auth.channelId != ''){
      this.endPrediction();
    }
  }

  
  private createPrediction(question: string, options: string[] , index: number){

    console.log('Prediction Starded')

    const choices = options.map(option => ({ title: option }));

      let body = {
        broadcaster_id: this.auth.channelId,
        title: this.title,
        outcomes: choices,
        prediction_window: 30
      };

      this.requestService.postData(this.auth.twitchApiUrl + '/predictions', body)
      .subscribe((data: any) => {
        this.predictionId = data.data[0].id;
        this.correctId = data.data[0].outcomes[index].id
      })
  }

  private endPrediction(){

    console.log('PREDICTION ENDED')

    let body = {
      broadcaster_id: this.auth.channelId,
      id: this.predictionId,
      status: 'RESOLVED',
      winning_outcome_id: this.correctId
    };

    this.requestService.patchData(this.auth.twitchApiUrl + '/predictions', body)
      .subscribe(() => {
        
      })

  }

  public starteFrage(){

    console.log('TEST')

    if(this.started == false && this.auth.channelId != ''){
      this.createPrediction(this.data.question, this.data.options, this.data.index)
    }
      this.started = true;
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
    console.log('test')
    this.showAnswer = true;
    this.hideQuestion = false;
    this.showQuestionVideo = false;
    this.showQuestionPicture = false;
  }

  public clickShowLButton(){
    this.showLButton = true;
  }

  public clickSwitchPictures(){
    this.errorPicture?.switchToCorrected();
    this.geoguessr?.switchToCorrected();
    this.guessing?.switchToCorrected();
  }

  public hideAnswer(){
    this.errorPicture?.hideAllButWhiteboard();
    this.geoguessr?.hideAllButWhiteboard();
    this.guessing?.hideAllButWhiteboard();
    this.voiceline?.showAnswer();
    this.hideQuestion = true;
  }

  public clickShowBoards(){

    this.showQuestionPicture = false;
    this.showQuestionVideo = false;
    this.showButtons = true;
    this.visibleBoard.display = 'block';
    this.visibleWaiting.display = 'none';

  }

  public clickHideBoard(){
    this.showButtons = true;
    this.visibleBoard.display = 'none';
    this.showLButton = false;
    this.voiceline?.hideAnswer();
  }


}
