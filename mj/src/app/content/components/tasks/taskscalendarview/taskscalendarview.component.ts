import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef, OnInit} from '@angular/core';
import {startOfDay,  endOfDay,  subDays,  addDays,  endOfMonth,  isSameDay,  isSameMonth,  addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView,} from 'angular-calendar';
import { ITasks } from '../../../models/tasks.model';

import { TasksService } from '../../../services/tasks.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
//import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { TasksData, TaskspopupviewComponent } from '../taskspopupview/taskspopupview.component';
import {TasksdialogService} from '../../../services/tasksdialog.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
}; 

@Component({
  selector: 'app-taskscalendarview',
  templateUrl: './taskscalendarview.component.html',
  styleUrls: ['./taskscalendarview.component.scss'],
  providers: [DialogService,TasksdialogService]
})
export class TaskscalendarviewComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private taskDialogService: TasksdialogService,
    private taskservice:TasksService) {}

  ngOnInit(){
    console.log('---------Hi call db-----');
    this.getAllmyTasks();
    
  }

  getAllmyTasks(){

    this.taskservice.getAllMyPendingTasks('/tasks/getallmypendingtasks').subscribe(
      (myDbData: ITasks[]) => {
        console.log(myDbData);
        myDbData.forEach((item)=>{
          this.events.push({
            id:item.TaskID, 
            start:new Date(item.StartDate),
            end:new Date(item.EndDate),
            title:item.TaskName,
            color: colors.yellow,
            actions: this.actions
          })
        });
        this.viewDate = new Date();
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            //this.callNext(200);
          }
        });
      }
    );
  }

  openPreview(action: string, event: CalendarEvent): void {
    let id:number = Number(event.id);
    const res = new TasksData('{data}', id, 'open', 'X', 'view');
    const req = this.dialog.open(TaskspopupviewComponent, { data: res, panelClass: 'mj-preview-modal' });
    req.afterClosed().subscribe(dataBox => {
      if (dataBox) {
        const data = dataBox;
      }
    });
  }

  openEventInDialog(action: string, event: CalendarEvent){
    let id:number = Number(event.id);
    const result = this.taskDialogService.openTasksDialog('',id,'myaction','Are you sure','mytype');
    result.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.markAsComplete(id);
      }
    });
  }

  markAsComplete(taskId){
    console.log(taskId);
    if(taskId>0){
      console.log('-----Update task-----');
      const result = {"TaskID":taskId,"Status":true};
      this.taskservice.updateStatus(result, taskId, '/tasks/updatestatus/').subscribe(
        res => {
          if (res) {
            this.dialogService.MessageBox('Marked as Complete', 'X', 100, 'SuccessMessage');
            //this.callNext(1000);
            //this.refreshCalendar(100);
            this.events = [];
            this.getAllmyTasks();
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

  //---------Calendar------------------------//
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    //--note this.viewDate is current date;
    console.log(date);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action);
    console.log('--------xxx------');
    console.log(event.id);
    let TaskId = event.id;
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  
}
