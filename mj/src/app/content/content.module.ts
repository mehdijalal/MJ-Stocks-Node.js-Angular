import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { FlexLayoutModule } from '@angular/flex-layout';




import { QuillModule } from 'ngx-quill';
import { ReplacePipe } from './shared/pipes/replace-pipes';
//--------charts--------------//
import { ChartsModule } from 'ng2-charts';

import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksformComponent } from './components/tasks/tasksform/tasksform.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { TaskscalendarviewComponent } from './components/tasks/taskscalendarview/taskscalendarview.component';
import { TaskspopupviewComponent } from './components/tasks/taskspopupview/taskspopupview.component';

//-------for calendar module-------------------//
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { TasksnewformComponent } from './components/tasks/tasksnewform/tasksnewform.component';
import {MomentPipe} from './shared/pipes/moment-pipes';
import { StocksComponent } from './components/stocks/stocks.component';

@NgModule({
  declarations: [
    AdminComponent, 
    UsersComponent, 
    ReplacePipe,
    DashboardsComponent,
    TasksComponent,
    TasksformComponent,
    TaskscalendarviewComponent,
    TaskspopupviewComponent,
    TasksnewformComponent,
    MomentPipe,
    StocksComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatRadioModule,
    QuillModule.forRoot(),
    FlexLayoutModule,
    ChartsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModalModule,
    FlatpickrModule.forRoot(),
    NgxMaterialTimepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  exports:[
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  entryComponents:[
    TaskspopupviewComponent,
  ]
})
export class ContentModule { }
