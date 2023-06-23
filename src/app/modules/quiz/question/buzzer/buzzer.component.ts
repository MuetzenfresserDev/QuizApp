import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private playerService: PlayerNameService) { }

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

  public decreasePoints(index: number, player: Player){
    player.points -= 50;
    this.playerService.setPlayerAtIndex(index, player);
  }

  public showQuestion(){
    this.show = true;
  }

}
