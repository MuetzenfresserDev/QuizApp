import { Injectable } from '@angular/core';
import { Player } from 'src/app/interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerNameService {

playerNames: string[] = ["","","",""];
players: Player[] = [];

constructor() { }

public setNameAtIndex(index: number, name: string){
  this.playerNames[index] = name;
}

public setPlayerAtIndex(index: number, player: Player){
  this.players[index] = player;
  console.log(this.players);
}

}
