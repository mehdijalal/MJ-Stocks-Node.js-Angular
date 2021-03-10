import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks.component';
import { TasksformComponent } from './components/tasks/tasksform/tasksform.component';
import { TaskscalendarviewComponent } from './components/tasks/taskscalendarview/taskscalendarview.component';
import { TasksnewformComponent } from './components/tasks/tasksnewform/tasksnewform.component';

import { TaskresolverserviceService } from './services/taskresolverservice.service';
const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'alltasks',
        children:[
          {
            path:'',component:TasksComponent
          },
          {
            path:'alltaskspreloaded',component:TasksComponent,resolve:{testnewslist:TaskresolverserviceService}
          },
          {
            path:'addnew',component:TasksnewformComponent
          },
          {
            path:'addnew/:taskid',component:TasksnewformComponent
          },
          {
            path:'category/:categoryid/:duedate',component:TasksComponent
          },
          {
            path:'category/:categoryid/:duedate/addnew',component:TasksnewformComponent
          },
          {
            path:'category/:categoryid/:duedate/addnew/:taskid',component:TasksnewformComponent
          },
          {
            path:'categorywithstartend/:categoryid/:startdate/:enddate',component:TasksComponent
          },
          {
            path:'categorywithstartend/:categoryid/:startdate/:enddate/addnew',component:TasksnewformComponent
          },
          {
            path:'categorywithstartend/:categoryid/:startdate/:enddate/addnew/:taskid',component:TasksnewformComponent
          },
          {
            path:'status/:statustype/:fromstatusstartdate/:fromstatusenddate',component:TasksComponent
          },
          {
            path:'status/:statustype/:fromstatusstartdate/:fromstatusenddate/addnew',component:TasksnewformComponent
          },
          {
            path:'status/:statustype/:fromstatusstartdate/:fromstatusenddate/addnew/:taskid',component:TasksnewformComponent
          },
            // {
          //   path:'addtask',component:TasksformComponent
          // },
          // {
          //   path:'addtask/:taskid',component:TasksformComponent
          // },
          // {
          //   path:'category/:categoryid/:duedate',component:TasksComponent
          // },
          // {
          //   path:'category/:categoryid/:duedate/addtask',component:TasksformComponent
          // },
          // {
          //   path:'category/:categoryid/:duedate/addtask/:taskid',component:TasksformComponent
          // },
          // {
          //   path:'categorywithstartend/:categoryid/:startdate/:enddate',component:TasksComponent
          // },
          // {
          //   path:'categorywithstartend/:categoryid/:startdate/:enddate/addtask',component:TasksformComponent
          // },
          // {
          //   path:'categorywithstartend/:categoryid/:startdate/:enddate/addtask/:taskid',component:TasksformComponent
          // },
          // {
          //   path:'status/:statustype/:fromstatusstartdate/:fromstatusenddate',component:TasksComponent
          // },
          // {
          //   path:'status/:statustype/:fromstatusstartdate/:fromstatusenddate/addtask',component:TasksformComponent
          // },
          // {
          //   path:'status/:statustype/:fromstatusstartdate/:fromstatusenddate/addtask/:taskid',component:TasksformComponent
          // },
        ]
      },
      {
        path:'calendar',
        children:[
          {
            path:'',component:TaskscalendarviewComponent
          },
        ]
      },
      {
        path:'hometasks',
        children:[
          // {
          //   path:'',component:HometasksComponent
          // }
        ]
      },
      // {
      //   path:'hometasks',component:HometasksComponent
      // }
    ]
  }
 
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
