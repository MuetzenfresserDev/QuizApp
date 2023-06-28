import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from 'src/app/interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerNameService {

playerNames: string[] = ["","","",""];
players: Player[] = [];

playersSubject: Subject<Player[]> = new Subject<Player[]>();

constructor() { }

public setNameAtIndex(index: number, name: string){
  this.playerNames[index] = name;
}

public setPlayerAtIndex(index: number, player: Player){
  this.players[index] = player;
  sessionStorage.setItem('players', JSON.stringify(this.players));
}

public setPlayerAtIndexDec(index: number, player: Player){

  this.players = JSON.parse(sessionStorage.getItem('players')|| '[]')

  this.players[index] = player;
  sessionStorage.setItem('players', JSON.stringify(this.players));
  this.playersSubject.next(this.players);
}

}
