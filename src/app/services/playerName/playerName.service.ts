import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerNameService {

playerNames: string[] = ["","","",""];

constructor() { }

public setNameAtIndex(index: number, name: string){
  this.playerNames[index] = name;
}

}
