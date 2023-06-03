import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

constructor( private dialog: MatDialog) { }

public openDialog<T>(data: DialogData<T>): MatDialogRef<any>{

  console.log(data)

  let width: string = '100vw';
  let height: string = '100vh';

  if(data.parseWidth != undefined){
    width = data.parseWidth;
  }
  if(data.parseHeight != undefined){
    height = data.parseHeight;
  }
  
  let maxWidth: string = '';

  let matDialogRef = this.dialog.open(data.component, {
    data: {
      Data: data.data
    },
    width: width,
    height: height,
    maxWidth: maxWidth,
    enterAnimationDuration: '500ms',
    exitAnimationDuration: '500ms',
    autoFocus: false,
  });

  return matDialogRef;
}

}
