import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConstQuestions } from 'src/app/constQuestions';
import { Player } from 'src/app/interfaces/player';
import { PlayerNameService } from 'src/app/services/playerName/playerName.service';

@Component({
  selector: 'app-buzzer',
  templateUrl: './buzzer.component.html',
  styleUrls: ['./buzzer.component.scss']
})
export class BuzzerComponent implements OnInit {

  @Input() data: any;
  players: Player[] = [];
  show: boolean = false;
  videoSize = ConstQuestions.videoSize;
  pictureSize = ConstQuestions.pictureSize;
  placeholderSize = {width: '900', height: '429'}
  questionPictureSize = {width: '704', height: '484'};
  youtubeLink: SafeResourceUrl | undefined;
  showVideo: boolean = false;
  showPicture: boolean = false;
  showPictureQuestion: boolean = false;
  showLsgButton = false;

  @ViewChild('audioPlayer') audioPlayer: ElementRef | undefined;

  constructor(private playerService: PlayerNameService, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    if(JSON.parse(sessionStorage.getItem('players')|| '[]').length != 0){
      this.players = JSON.parse(sessionStorage.getItem('players')|| '[]');
    }
    else{
    this.players = this.playerService.players;
    }

    console.log(this.players)

    setTimeout(() => {
      document.getElementById("buzz")!.style.display = "block";    
    }, 350);
  }

  public playVoiceline() {

    if (this.audioPlayer!.nativeElement.paused){
      this.audioPlayer!.nativeElement.play();
    } else{
      this.audioPlayer!.nativeElement.pause();
      this.audioPlayer!.nativeElement.currentTime = 0;
    }

    console.log(this.audioPlayer)
  }

  public decreasePoints(index: number, player: Player){
    player.points -= 50;
    this.playerService.setPlayerAtIndexDec(index, player);
  }

  public showQuestion(){
    console.log('Test')
    if(document.getElementById("buzz")!.style.display == "none"){
      document.getElementById("buzz")!.style.display = "block";
    }
    this.show = true;
    this.showPictureQuestion = true;
    this.showLsgButton = true;
    this.showVideo = false;
    this.showPicture = false;
    this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.videoQuestion);
  }

  public showVideoAnswer(){
    if(document.getElementById("buzz")!.style.display == "block"){
      document.getElementById("buzz")!.style.display = "none";
    }
    this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video);
    this.showVideo = true;
    this.showPictureQuestion = false;
    this.showLsgButton = false;
  }

  public showPictureAnswer(){
    this.showLsgButton = false;

    if(document.getElementById("buzz")!.style.display == "block"){
      document.getElementById("buzz")!.style.display = "none";
    }
    this.showPicture = true;
    this.showPictureQuestion=false;
  }

  public setVideoQuestionWidth(){
    this.questionPictureSize.width = '804';
  }

  public setVideoQuestionHeight(){
    this.questionPictureSize.height = '584';
  }

}
