import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export class DialogModel {
  constructor(public title: string, public message: string) {}
}

export class CustomBox {
  constructor(public title: string, public message: string, public no: string, public yes: string, public refresh: boolean = true) {}
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  title: string;
  message: string;
  no: string;
  yes: string;
  refresh: boolean;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CustomBox) {
    this.title = data.title;
    this.message = data.message;
    this.no = data.no;
    this.yes = data.yes;
    this.refresh = data.refresh;
  }

  ngOnInit() {}

  onConfirm(): void {
    // Close the dialog, return true
    if(this.no==='logout'){
    }
    this.dialogRef.close(this.refresh);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  isHidden() {
    return this.refresh;
  }

  displayTitle() {
    return this.title.length > 0;
  }
}
