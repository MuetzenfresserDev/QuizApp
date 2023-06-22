import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  dialogData: any;
  playerCount: any = JSON.parse(sessionStorage.getItem('playerCount')|| '[]').playerCount;
  setWidth: any = JSON.parse(sessionStorage.getItem('playerCount')|| '[]').fxFlex;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      Data: any;
      Kind: string;
    },
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<DialogComponent>
  ) { 
    this.dialogData = data.Data.Data;
  }

  ngOnInit() {
    console.log(this.playerCount);
    console.log(this.setWidth);
  }

  public closeDialog(){

    if(document.getElementById("buzz")!.style.display == "block"){
      document.getElementById("buzz")!.style.display = "none";
    }

    this.dialog.closeAll();
  }

}
