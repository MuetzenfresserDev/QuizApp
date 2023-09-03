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
  youtubeLink: SafeResourceUrl | undefined;
  showVideo: boolean = false;
  showPicture: boolean = false;

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
    this.show = true;
  }

  public showVideoAnswer(){
    if(document.getElementById("buzz")!.style.display == "block"){
      document.getElementById("buzz")!.style.display = "none";
    }
    this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video);
    this.showVideo = true;
  }

  public showPictureAnswer(){
    if(document.getElementById("buzz")!.style.display == "block"){
      document.getElementById("buzz")!.style.display = "none";
    }
    this.showPicture = true;
  }

}
