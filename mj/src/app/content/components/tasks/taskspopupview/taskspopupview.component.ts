import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject,SecurityContext } from '@angular/core';

import { DialogService } from '../../../../shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ITasks } from '../../../models/tasks.model';

import { TasksService } from '../../../services/tasks.service';
import { DomSanitizer } from '@angular/platform-browser'
import { formatDate } from '@angular/common';

//--------we add the router here for edit to redirect to edit form-----//
import { ActivatedRoute,Router } from '@angular/router';

export class TasksData {
  constructor(public dynamicdata: string, public id: number, public action: string, public text: string, public type: string) {}
}

@Component({
  selector: 'app-taskspopupview',
  templateUrl: './taskspopupview.component.html',
  styleUrls: ['./taskspopupview.component.scss']
})
export class TaskspopupviewComponent implements OnInit {

  action;
  close;
  taskId: number;
  taskResult;
  type: string;

  taskname;
  category;
  startdate;
  enddate;
  textContent;
  textContent1;
  editorReadSantStyle = {
    height: '100px',
    alignment:'MJ Selected-Quill'
  };
  constructor(
    private _router:Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private taskservice:TasksService,
    public callRef: MatDialogRef<TaskspopupviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TasksData,
    private sanitizer?: DomSanitizer,
    ) { 
      this.taskId = data.id;
      this.action = data.action;
      this.close = data.text;
      this.type = data.type;
    }

  ngOnInit(): void {
    this.getTaskById(this.taskId);
  }

  closeWindow(): void {
    this.callRef.close(false);
  }
  getTaskById(id) {
    this.taskservice.getTaskById(id,'/tasks/').subscribe(
      (thetask: ITasks) => this.dispalyTask(thetask),
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try Again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            //this.callNext(200);
          }
        });
      }
    );
  }

  dispalyTask(task: ITasks) {
    this.taskResult = task[0];
    console.log(this.taskResult);
    this.taskId = task[0].TaskID;
    this.taskname = task[0].TaskName;
    this.category = task[0].CategoryName;
    this.startdate = formatDate(task[0].StartDate,'yyyy-MM-dd','en_US');
    this.enddate = formatDate(task[0].EndDate,'yyyy-MM-dd','en_US');

    //---fore here we hide the description----//
    //this.textContent = this.HTMLSant(task[0].Description);
  }

  HTMLSant(html:string){
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  markAsComplete(taskId){
    console.log(taskId);
    this.closeWindow();
    if(taskId>0){
      console.log('-----Update task-----');
      const result = {"TaskID":taskId,"Status":true};
      this.taskservice.updateStatus(result, taskId, '/tasks/updatestatus/').subscribe(
        res => {
          if (res) {
            this.dialogService.MessageBox('Marked as Complete', 'X', 100, 'SuccessMessage');
            //this.callNext(1000);
            //this.refreshCalendar(100);
          } else {
            this.dialogService.MessageBox('Error updating record', 'X', 5000, 'ErrorMessage');
          }
        },
        error => {
          const res = this.dialogService.ErrorDialog(
            'Server Error',
            'Sorry, the system is unavailable at the moment.',
            'Close',
            'Try Again'
          );
          res.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
              //this.callNext(200);
            }
          });
        }
      );
    }
  }
  editTask(taskId:number){
    console.log(taskId);
    this.closeWindow();
    this._router.navigate(['./tasks/alltasks/addnew/',taskId]);
  }
  onConfirm(): void {
    console.log('----Hi calling Tasks dialog----');
    this.callRef.close(true);
  }


}
