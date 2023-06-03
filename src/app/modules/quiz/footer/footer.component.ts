import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  playerCount: number[] = [];
  fxFlex: string = '100';

  constructor(private snackbarService: SnackbarService) { }

  ngOnInit() {
    
  }

  public setPlayerCount(input: string){

    let value = parseInt(input);

    if(value == 1 || value == 2 || value == 3 || value == 4){

      if(value == 2){
        this.fxFlex = '50';
      } else if(value == 3){
        this.fxFlex = '33';
      } else{
        this.fxFlex ='25'
      }
  
      for (let index = 0; index < value; index++) {
        this.playerCount.push(0);
      }

      sessionStorage.setItem('playerCount',JSON.stringify({playerCount: this.playerCount, fxFlex: this.fxFlex }))

    } else{
      this.snackbarService.openSnackBar('Keine gültige Spieleranzahl festgelegt! Bitte gültige Anzahl festlegen.', 'snackbarRed');
    }

  }

}
