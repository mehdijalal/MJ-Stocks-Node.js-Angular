import { Component, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
@Component({
  selector: 'app-mysnackbar',
  templateUrl: './mysnackbar.component.html',
  styleUrls: ['./mysnackbar.component.scss']
})
export class MysnackbarComponent {

  constructor(public snackBarRef: MatSnackBarRef<MysnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data?: any) {}



}
