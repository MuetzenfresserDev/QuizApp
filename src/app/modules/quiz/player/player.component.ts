import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { PlayerNameService } from 'src/app/services/playerName/playerName.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnChanges{

  @Input() index: number = 0;

  player: Player = {name:'',points:0}

  constructor(private playerNameService: PlayerNameService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(JSON.parse(sessionStorage.getItem('players')|| '[]').length != 0){
      this.player = JSON.parse(sessionStorage.getItem('players')|| '[]')[this.index];
    }
  }

  public setPlayerName(name: string){
    this.player.name = name;
    this.playerNameService.setNameAtIndex(this.index, name);
    this.playerNameService.setPlayerAtIndex(this.index, this.player);
  }

  public increasePoints(ammount: number){
    this.player.points += ammount;
    this.playerNameService.setPlayerAtIndex(this.index, this.player);
  }

  public decreasePoints(ammount: number){
    this.player.points -= ammount;
    this.playerNameService.setPlayerAtIndex(this.index, this.player);
  }

  public resetPlayer(){
    this.player.points = 0;
    this.player.name = '';
    this.playerNameService.setPlayerAtIndex(this.index, this.player);
  }

}
