import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

//-----------date formater----------------------//
import { MomentDateAdapter, MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
//---------dialog------------------/
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
//import * as _moment from 'moment';
import * as _moment from 'moment-timezone';
import { DialogService } from './../../../../shared/services/dialog.service';
import { TasksService } from './../../../services/tasks.service';
import { ITasks } from './../../../models/tasks.model';
import { ICategory } from '../../../../shared/models/lookup.model';
import { LookupsService } from '../../../../shared/services/lookups.service';
import { Subscription } from 'rxjs';
//import { toDate } from 'date-fns';
//import { formatDate } from '@angular/common';
//import {TooltipPosition} from '@angular/material/tooltip';



//const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};
@Component({
  selector: 'app-tasksnewform',
  templateUrl: './tasksnewform.component.html',
  styleUrls: ['./tasksnewform.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      //deps: [MAT_DATE_LOCALE]
    },
    //---Note: below proider will set utc to 2020-07-14T00:00:00.000Z so I used for all this format-----//
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DialogService
  ]
})

export class TasksnewformComponent implements OnInit {

  tz = _moment.tz.guess();
  taskForm: FormGroup;
  id = 0;
  data;
  //status;
  //statusName;
  //lookuptablename;
  editorStyle = {
    'min-height': '100px'
  };
  sDate: any;
  mDate: any;
  radioValue;
  category;
  repeattypes;
  starttime;
  weekdays;
  isRecuringTask: boolean = false;
  isShowSelectedDays:boolean = false;
  //-------for display different views-----//
  duedate;
  categoryID: number;
  startdate;
  enddate;
  statusStartdate;
  statusEnddate;
  statusType;
 


  //startDate = new FormControl(_moment());
  //CategoryID = new FormControl('', [Validators.required]);
  selected;

  panelOpenState = false;

  private myformSubscribe: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private lookupService: LookupsService,
    private taskService: TasksService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {

    console.log(this.tz);
    
    let _mydate = new Date();
    
    //console.log(_mydate);
    //console.log(_mydate.toISOString().split('T')[0]);
    let _currentDate = _mydate.toISOString().split('T')[0];

    this.sDate = _currentDate;
   
    this.taskForm = this._formBuilder.group({
      TaskID: [0, null],
      TaskName: ['', Validators.required],
      StartDate: [_currentDate, Validators.required],
      EndDate: [_currentDate, Validators.required],
      StartTimeID: [17, null],
      EndTimeID: [18, null],
      Description: ['', null],
      CategoryID: [0, null],
      RepeatTypeID: ['', null],
      SelectedWeekDays:['',null],
    });
   
    // this.myformSubscribe = this.taskForm.valueChanges.subscribe(res => {
    //   this.mDate = new Date(res.StartDate);
    // });

     this.taskForm.controls['StartDate'].valueChanges.subscribe(res=>{
       console.log('---The changes----');
       //console.log(res);
       //console.log(res.StartDate);
       this.mDate = new Date(res);
       console.log(this.mDate);
     })
    //----------for edit-----------------//
    this._activatedRoute.paramMap.subscribe(params => {
      //---in the route we created edit route we set id as param so we get it here---//
      const TaskID = +params.get('taskid');
      if (TaskID) {
        this.id = TaskID;
        this.getTaskById(TaskID);
      } else {
        this.taskForm.patchValue({
          CategoryID: 1
        });
      }
    });

    //console.log(this.id);

    let lookupTablename: string;
    this.lookupService.getLookupByTableAlias((lookupTablename = 'category')).subscribe(
      (icategory: any) => {
        this.category = icategory;
        //console.log(icategory);
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try Again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(4000);
          }
        });
      }
    );

    this.lookupService.getLookupByTableAlias((lookupTablename = 'time')).subscribe(
      (istarttime: any) => {
        this.starttime = istarttime;
        //console.log(istarttime);
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try Again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(4000);
          }
        });
      }
    );

    this.lookupService.getLookupByTableAlias((lookupTablename = 'repeat')).subscribe(
      (irepeats: any) => {
        this.repeattypes = irepeats;
        //console.log(irepeats);
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try Again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(4000);
          }
        });
      }
    );

    this.lookupService.getLookupByTableAlias((lookupTablename = 'weekdays')).subscribe(
      (iWeekdays: any) => {
        this.weekdays = iWeekdays;
        //console.log(iWeekdays);
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try Again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(4000);
          }
        });
      }
    );

  
  }
  /*
  ** This functions sets the end date based on start date
  */
  setEndDateChange(event) {
    console.log('-----sss---');
    console.log(event.value);
    this.taskForm.patchValue({
      EndDate: event.value,
      //TaskReminderDate: event.value
    });
  }

  onRepeatChange(event){
    console.log(event.value);
    let repeattype = event.value;
    if(repeattype==3){
       this.taskForm.controls['SelectedWeekDays'].enable();
       this.isShowSelectedDays = true;
    }else{
      this.isShowSelectedDays = false;
      this.taskForm.controls['SelectedWeekDays'].disable();
    }

  }
  /*
  ***Note: this is an important function if you remove it
  *** You will get error when you select add reminder
  */
  ngAfterViewChecked() {
    //your code to update the model
    //console.log('----detect change-xxx----');
    this.cdr.detectChanges();
  }

  // ngDoCheck() {
  //   this.cdr.markForCheck()
  // }


  makeItRecurring() {

    this.isRecuringTask = true;
    this.taskForm.controls['RepeatTypeID'].enable();
    //this.taskForm.controls['TaskReminderTime'].enable();

    
  }
  removeRecuring() {
    this.isRecuringTask = false;
    this.taskForm.controls['RepeatTypeID'].disable();
    //this.taskForm.controls['TaskReminderTime'].disable();
  }
  getTaskById(id) {
    this.taskService.getTaskById(id, '/tasks/').subscribe(
      (thetask: ITasks) => this.editTask(thetask),
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try Again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(200);
          }
        });
      }
    );
  }
  editTask(thetask: ITasks) {
    console.log(thetask);
    this.taskForm.patchValue({
      TaskID: thetask[0].TaskID,
      TaskName: thetask[0].TaskName,
      StartDate: thetask[0].StartDate,
      EndDate: thetask[0].EndDate,
      Description: thetask[0].Description,
      Duration: thetask[0].Duration,
      CategoryID: thetask[0].CategoryID,
      StartTimeID: thetask[0].StartTimeID,
      EndTimeID: thetask[0].EndTimeID
    });
  }

  callNext(time) {
    setTimeout(() => {
      this._activatedRoute.paramMap.subscribe(params => {
        const TaskID = +params.get('taskid');
        if (TaskID) {
          this.id = TaskID;
          this.getTaskById(TaskID);
        }
      });
    }, time);
  }

  taskAction() {
    console.log('----action ----');
 
    
    const result = this.taskForm.value;
    let scheduleType = result.Schedule;
    if (scheduleType == 1) {
      let datenow = _moment().format('YYYY-MM-DD');
      console.log(datenow);
      let _today = { 'StartDate': datenow, 'EndDate': datenow }
      Object.assign(result, _today);

    } else if (scheduleType == 2) {

      let _theTomorrow = _moment().add(1, 'd').format('YYYY-MM-DD');
      //console.log(_theTomorrow);
      let _tommorrow = { 'StartDate': _theTomorrow, 'EndDate': _theTomorrow }
      Object.assign(result, _tommorrow);
    }
    // }else{
    //   let postedStartDate = _moment(result.StartDate);
    //   let postedEndDate = _moment(result.EndDate);
    //   //console.log(postedStartDate);
    //   //console.log(postedEndDate);
    //   let _newStartandEnddate = {'StartDate':postedStartDate, 'EndDate':postedEndDate}
    //   Object.assign(result,_newStartandEnddate)
    // }
    //console.log(scheduleType);
    console.log(result);
    
   
    if (result.TaskID > 0) {
      console.log('-----Update all task-----');
      this.taskService.updateTask(result, result.TaskID, '/tasks/update/').subscribe(
        res => {
          if (res==1) {
            this.dialogService.MessageBox('Updated', 'X', 100, 'SuccessMessage');
            this.callNext(5000);
          }else if(res=='Invalid'){
            this.dialogService.MessageBox('Invalid dates', 'X', 5000, 'ErrorMessage');
          }  else {
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
              this.callNext(200);
            }
          });
        }
      );
    } else {
      console.log('---------add task-------');
      this.taskService.insertTask(result, '/tasks/insert').subscribe(
        res => {
          //console.log(res);
          if (res>0) {
            console.log(res);
            //this.dialogService.callRedirect('../tasks/alltasks', 1);
            this.callNext(3000);
            //this.taskForm.controls['TaskName'].reset();
            this.dialogService.MessageBox('Record inserted successfully', 'X', 6000, 'SuccessMessage');

            //this.dialogService.callRedirect('../tasks/officetasks/addtask/' + res, 4000);
          }else if(res=='Invalid'){
            this.dialogService.MessageBox('Invalid dates', 'X', 5000, 'ErrorMessage');
          } else {
            this.dialogService.MessageBox('Error insert record', 'X', 5000, 'ErrorMessage');
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
              this.callNext(200);
            }
          });
        }
      );
    }
  }

  saveAndClose() {
    this._activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.categoryID = Number(params.get('categoryid'));
      //=====For Category start here==============//
      this.duedate = params.get('duedate');
      //=========Startdate and enddate starts here==========//
      this.startdate = params.get('startdate');
      this.enddate = params.get('enddate');
      //==========status view===============//
      this.statusType = params.get('statustype');
      this.statusStartdate = params.get('fromstatusstartdate');
      this.statusEnddate = params.get('fromstatusenddate');
      //---in the route we created edit route we set id as param so we get it here---//
      const TaskID = +params.get('taskid');
      this._router.navigate(['./tasks/alltasks']);

    });
  }

  /*
  ** set end time based on start time
  ** same as outlook
  */
  setEndTime(event) {
    console.log('-----ohhhh change----');
    let starttimeID: number = event.value;
    let endtimeId: number = 0;
    if (starttimeID == 1) {
      endtimeId = 2;
    } else if (starttimeID == 2) {
      endtimeId = 3;
    } else if (starttimeID == 3) {
      endtimeId = 4;
    } else if (starttimeID == 4) {
      endtimeId = 5;
    } else if (starttimeID == 5) {
      endtimeId = 6;
    } else if (starttimeID == 6) {
      endtimeId = 7;
    } else if (starttimeID == 7) {
      endtimeId = 8;
    } else if (starttimeID == 8) {
      endtimeId = 9;
    } else if (starttimeID == 9) {
      endtimeId = 10;
    } else if (starttimeID == 10) {
      endtimeId = 11;
    } else if (starttimeID == 11) {
      endtimeId = 12;
    } else if (starttimeID == 12) {
      endtimeId = 13;
    } else if (starttimeID == 13) {
      endtimeId = 14;
    } else if (starttimeID == 14) {
      endtimeId = 15;
    } else if (starttimeID == 15) {
      endtimeId = 16;
    } else if (starttimeID == 16) {
      endtimeId = 17;
    } else if (starttimeID == 17) {
      endtimeId = 18;
    } else if (starttimeID == 18) {
      endtimeId = 19;
    } else if (starttimeID == 19) {
      endtimeId = 20;
    } else if (starttimeID == 20) {
      endtimeId = 21;
    } else if (starttimeID == 21) {
      endtimeId = 22;
    } else if (starttimeID == 22) {
      endtimeId = 23;
    } else if (starttimeID == 23) {
      endtimeId = 24;
    } else if (starttimeID == 24) {
      endtimeId = 25;
    } else if (starttimeID == 25) {
      endtimeId = 26;
    } else if (starttimeID == 26) {
      endtimeId = 27;
    } else if (starttimeID == 27) {
      endtimeId = 28;
    } else if (starttimeID == 28) {
      endtimeId = 29;
    } else if (starttimeID == 29) {
      endtimeId = 30;
    } else if (starttimeID == 30) {
      endtimeId = 31;
    } else if (starttimeID == 31) {
      endtimeId = 32;
    } else if (starttimeID == 32) {
      endtimeId = 33;
    } else if (starttimeID == 33) {
      endtimeId = 34;
    } else if (starttimeID == 34) {
      endtimeId = 35;
    } else if (starttimeID == 35) {
      endtimeId = 36;
    } else if (starttimeID == 36) {
      endtimeId = 37;
    } else if (starttimeID == 37) {
      endtimeId = 38;
    } else if (starttimeID == 38) {
      endtimeId = 39;
    } else if (starttimeID == 39) {
      endtimeId = 40;
    } else if (starttimeID == 40) {
      endtimeId = 41;
    } else if (starttimeID == 41) {
      endtimeId = 42;
    } else if (starttimeID == 42) {
      endtimeId = 43;
    } else if (starttimeID == 43) {
      endtimeId = 44;
    } else if (starttimeID == 44) {
      endtimeId = 45;
    } else if (starttimeID == 45) {
      endtimeId = 46;
    } else if (starttimeID == 46) {
      endtimeId = 47;
    } else if (starttimeID == 47) {
      endtimeId = 48;
    } else if (starttimeID == 48) {
      endtimeId = 1;
    }

    this.taskForm.patchValue({
      EndTimeID: endtimeId
    });
  }


}
