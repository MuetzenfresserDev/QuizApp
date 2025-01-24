import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConstQuestions } from 'src/app/constQuestions';
import { Player } from 'src/app/interfaces/player';
import { PlayerNameService } from 'src/app/services/playerName/playerName.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() data: any;
  players: Player[] = [];
  show: boolean = true;
  showBackButton: boolean = false;
  showVideo: boolean = false;
  youtubeLink: SafeResourceUrl | undefined;
  youtubeQuestionLink: SafeResourceUrl | undefined;
  videoSize: {width: string, height: string} = ConstQuestions.videoSize;

  pictureSize = ConstQuestions.pictureSize;

  constructor(private playerService: PlayerNameService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('players')|| '[]').length != 0){
      this.players = JSON.parse(sessionStorage.getItem('players')|| '[]');
    }
    else{
    this.players = this.playerService.players;
    }

    if(this.data.searchVideo != undefined && this.data.searchVideo != ''){
      console.log('SAFE!')
      this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.answerVideo);
      this.youtubeQuestionLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.searchVideo);
    }

    /* setTimeout(() => {
      document.getElementById("geo")!.style.display = "block";    
    }, 350); */
  }

  public showQuestion(){
    this.show = true;
  }

  public clickShowCanvas(){
    this.show = false;
    document.getElementById("geo")!.style.display = "block";
    this.showBackButton = true;
    console.log('true')
  }

  public clickShowVideo(){
    this.show = false;
    //document.getElementById("geo")!.style.display = "block";
    this.showBackButton = true;
    console.log('true')
    this.showVideo = true;
  }

  public clickShowQuestion(){
    this.show = true;
    document.getElementById("geo")!.style.display = "none";
    this.showBackButton = false;
    this.showVideo = false;
  }

}
