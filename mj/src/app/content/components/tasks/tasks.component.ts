import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { Router,ActivatedRoute} from '@angular/router';
//------------Dialog services-------------------------------------//
import { DialogService } from './../../../shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
//-----------Models----------------------------------------------//
import { ITasks } from './../../models/tasks.model';
//-------------services-------------------------------------//
import { TasksService } from './../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tableResponsiveColumns=false;
  theTasks;

  //-------for display different views-----//
  duedate;
  categoryID;
  startdate;
  enddate;
  statusStartdate;
  statusEnddate;
  statusType;
  loadingdata:boolean=true;

  tasksList: ITasks[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ELEMENT_DATA:any[] = [];

  displayedColumns: string[] = [
    'select',
    'taskname',
    'category',
    'enddate',
    'status',
    'actions'
    ];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
    

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       // { title: 'Card 2', cols: 1, rows: 1 },
  //       // { title: 'Card 3', cols: 1, rows: 2 },
  //       // { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );


  //screenWidth2;
  constructor(private taskservice:TasksService,  
    public dialog: MatDialog,
    private dialogService: DialogService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver) {

      // this.screenWidth2 = window.innerWidth;
      // window.onresize = ()=>{
      //   this.screenWidth2 = window.innerWidth;
      //   if(this.screenWidth2<=599){
      //     this.tableResponsiveColumns=true;
      //   }else{
      //     this.tableResponsiveColumns=false;
      //   }
      // }
      
    }

  ngOnInit(): void {

         //----------for edit-----------------//
         this._activatedRoute.paramMap.subscribe(params => {
          //---in the route we created edit route we set id as param so we get it here---//
          console.log(params);
          this.categoryID = params.get('categoryid');
          //=====For Category start here==============//
          this.duedate = params.get('duedate');
          //=========Startdate and enddate starts here==========//
          this.startdate = params.get('startdate');
          this.enddate = params.get('enddate');
          //==========status view===============//
          this.statusType = params.get('statustype');
          this.statusStartdate = params.get('fromstatusstartdate');
          this.statusEnddate = params.get('fromstatusenddate');

          if (this.categoryID && this.duedate) {
            console.log('------cat and duedate------');
            this.refreshDataWithCategoryIDandDueDate(this.categoryID,this.duedate);
          }else if(this.categoryID && this.startdate && this.enddate){
            console.log('------cat and stardate enddate------');
            this.refreshDataWithCategoryIdStartdateEnddate(this.categoryID,this.startdate,this.enddate);
          }else if(this.statusType){
            console.log('------status startdate end------');
            this.refreshDataWithStatusStartdateEnddate(this.statusType,this.statusStartdate,this.statusEnddate);
          }
          else{
            console.log('------all category MJ Resolve------');
            this.refreshData();
            //this.getTasksPreloaded();

          }
        });

    
  }

  //---------This function is using route Resolvers-----//
  getTasksPreloaded(){
    console.log('-----------Preloaded data---------');
    this.tasksList = this._activatedRoute.snapshot.data['testnewslist'];
    if(this.tasksList){
      this.loadingdata = false;

      this.ELEMENT_DATA = this.tasksList;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.selection = new SelectionModel<any>(true, []);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }else{
      const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(200);
          }
        });
    }
  }

  refreshData() {
 
    console.log('-----------got here iss--------');
    this.taskservice.getAllTasks('/tasks/').subscribe(
      (modelData: ITasks[]) => {
       if(modelData){
        console.log(modelData);
        this.loadingdata = false;
        this.tasksList = modelData;
        this.ELEMENT_DATA = modelData;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.selection = new SelectionModel<any>(true, []);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       }
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(200);
          }
        });
      }
    );
  }

  refreshDataWithCategoryIDandDueDate(categoryID?,DueDate?) {
    //this.isCategoryView = true;
    console.log('-----------cate and only due date--------');
    this.taskservice.getAllTasksByCategoryID(categoryID,DueDate,'/tasks/category/').subscribe(
      (modelData: ITasks[]) => {
        if(modelData){
          console.log(modelData);
          this.loadingdata = false;
          this.tasksList = modelData;
          this.ELEMENT_DATA = modelData;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.selection = new SelectionModel<any>(true, []);

          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(200);
          }
        });
      }
    );
  }
  //-----------Get list based on category, start and end date---------//
  refreshDataWithCategoryIdStartdateEnddate(categoryID?,startdate?,enddate?) {
    console.log('-----------Start end date-------');
    this.taskservice.getAllTasksByCategoryIdStartdateEnddate(categoryID,startdate,enddate,'/tasks/categorywithstartend/').subscribe(
      (modelData: ITasks[]) => {
        if(modelData){
          console.log(modelData);
          this.loadingdata = false;
          this.tasksList = modelData;
          this.ELEMENT_DATA = modelData;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.selection = new SelectionModel<any>(true, []);
  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(200);
          }
        });
      }
    );
  }
 //-----------Get list based on Status, start and end date---------//
  refreshDataWithStatusStartdateEnddate(statusType?,startdate?,enddate?) {
    console.log('-----------Start end date-------');
    this.taskservice.getAlldataWithStatusStartdateEnddate(statusType,startdate,enddate,'/tasks/status/').subscribe(
      (modelData: ITasks[]) => {
        if(modelData){
          this.loadingdata = false;
          console.log(modelData);
          this.tasksList = modelData;
          this.ELEMENT_DATA = modelData;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.selection = new SelectionModel<any>(true, []);
  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.callNext(200);
          }
        });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  /*--------*/
  callRedirect(route, time) {
    setTimeout(() => {
      this.router.navigate([route]);
    }, time);
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
     
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    deleteTask(TaskID){
      console.log(TaskID);
      const result = this.dialogService.openDialog(TaskID, 'Confirm Action', 'Are you sure you want to delete?', 'Cancel', 'Delete Now');
      result.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.deleteTaskById(TaskID);
        }
      });
    }
    deleteAllTaskInThisSeries(RepeatTypeGuidForSeries){
      console.log(RepeatTypeGuidForSeries);
      const result = this.dialogService.openDialog(RepeatTypeGuidForSeries, 'Confirm Action', 'Are you sure you want to delete?', 'Cancel', 'Delete Now');
      result.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.deleteAllTaskInSeries(RepeatTypeGuidForSeries);
        }
      });
    }

    deleteAllTaskInSeries(RepeatTypeGuidForSeries){
      if(RepeatTypeGuidForSeries){
        console.log(RepeatTypeGuidForSeries);
        this.taskservice.deleteAllTaskBySeriesId(RepeatTypeGuidForSeries, '/tasks/deletefutureoccurence/').subscribe(
          res => {
            if (res) {
              this.dialogService.MessageBox('Deleted', 'X', 4000, 'SuccessMessage');
              this.callNext(1);
            } else {
              this.dialogService.MessageBox('Error Deleting', 'X', 5000, 'ErrorMessage');
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
    deleteTaskById(TaskID){
      if(TaskID>0){
        this.taskservice.deleteTaskById(TaskID, '/tasks/').subscribe(
          res => {
            if (res) {
              this.dialogService.MessageBox('Deleted', 'X', 4000, 'SuccessMessage');
              this.callNext(1);
            } else {
              this.dialogService.MessageBox('Error Deleting', 'X', 5000, 'ErrorMessage');
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


    updateStatus(TaskID:any,event:any){
      console.log(TaskID);
      console.log(event.checked);
      let status = event.checked;
      if(TaskID>0){
        console.log('-----Update task-----');
        const result = {"TaskID":TaskID,"Status":status};
        this.taskservice.updateStatus(result, TaskID, '/tasks/updatestatus/').subscribe(
          res => {
            if (res) {
              this.dialogService.MessageBox('Updated', 'X', 100, 'SuccessMessage');
              this.callNext(1000);
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
                this.callNext(200);
              }
            });
          }
        );
      }
    }
  
    deleteAllSelectedTasks(){
      console.log('-----deleting all selection---');
      let sel = this.selection.selected;
      const result = this.dialogService.openDialog(sel, 'Confirm Action', 'Are you sure you want to delete?', 'Cancel', 'Delete Now');
      result.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          //this.deleteAll(sel);
        }
      });
    }
    deleteAll(list){
      let lng = list.length;
   
      if (lng > 0) {
        this.taskservice.deleteAll(list,'/tasks/deleteall').subscribe(
          res => {
            if (res) {
              this.dialogService.MessageBox('Deleted', 'X', 4000, 'SuccessMessage');
              this.callNext(1);
            } else {
              this.dialogService.MessageBox('Error Deleting', 'X', 5000, 'ErrorMessage');
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

    //------Next call--------//

    callNext(timeout) {
      setTimeout(() => {
          //this.refreshData();
          this.ngOnInit();
      }, timeout);
    }

}
