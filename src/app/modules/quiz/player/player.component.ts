import { Component } from '@angular/core';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  player: Player = {name:'',points:0}

  constructor() { }

  public setPlayerName(name: string){
    this.player.name = name;
  }

  public increasePoints(ammount: number){
    this.player.points += ammount;
  }

  public decreasePoints(ammount: number){
    this.player.points -= ammount;
  }

  public resetPlayer(){
    this.player.points = 0;
    this.player.name = '';
  }

}
