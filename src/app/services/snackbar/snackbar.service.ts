import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackBarRef: any;

  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      panelClass: [className],
    });
    setTimeout(() => {
      this.snackBar.dismiss();
    }, 5000);
  }

  public openSnackBarWithAction(
    message: string,
    action: string,
    className: string
  ) {
    this.snackBarRef = this.snackBar.open(message, action, {
      panelClass: [className],
    });
  }

  public dismissActionSnackbar() {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }
}
