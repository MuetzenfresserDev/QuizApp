import { Component, Input, OnInit } from '@angular/core';
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

  pictureSize = ConstQuestions.pictureSize;

  constructor(private playerService: PlayerNameService) { }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('players')|| '[]').length != 0){
      this.players = JSON.parse(sessionStorage.getItem('players')|| '[]');
    }
    else{
    this.players = this.playerService.players;
    }

    console.log(this.players)

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
  }

}
