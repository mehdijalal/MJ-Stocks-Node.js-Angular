import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

//---------dialog------------------/
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomBox, DialogComponent } from '../../shared/components/dialog/dialog.component';
import { MysnackbarComponent } from '../../shared/components/mysnackbar/mysnackbar.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) {}

  MessageBox(message: string, action: string, duration: number, BoxColorClass) {
    // this._snackBar.open(message, action, {
    //   duration: 0,
    //   verticalPosition: 'top',
    //   horizontalPosition: 'center',
    //   panelClass: [BoxColorClass]
    // });
    // use custom snackbar to have icon
    this._snackBar.openFromComponent(MysnackbarComponent, {
      data: {
        message: message
      },
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [BoxColorClass]
    });
  }

  //--------------dialog-------//
  openDialog(id, title, message, reject, accept) {
    const resDialog = new CustomBox(title, message, reject, accept);

    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: '500px',
      data: resDialog
    });

    return dialogRef;
  }

  ErrorDialog(dialogHeading, messages: string, no, yes) {
    const res = new CustomBox(dialogHeading, messages, no, yes);

    const ref = this.dialog.open(DialogComponent, {
      maxWidth: '500px',
      data: res
    });

    return ref;
  }

  callRedirect(route, time) {
    setTimeout(() => {
      this.router.navigate([route]);
    }, time);
  }
}
