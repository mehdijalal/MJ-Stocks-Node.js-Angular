import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';





import { QuillModule } from 'ngx-quill';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { DefaultComponent } from './default/default.component';
import {DialogComponent} from './shared/components/dialog/dialog.component';
import {MysnackbarComponent} from './shared/components/mysnackbar/mysnackbar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


const mats=[
  BrowserAnimationsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  RouterModule,
  MatListModule,
  MatExpansionModule,
  MatTooltipModule,
  MatGridListModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSnackBarModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
]

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    DialogComponent,
    MysnackbarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    mats,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: true,
        readonly:true
      }
    }
    ),
    FlexLayoutModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModalModule,
    FlatpickrModule.forRoot(),
    NgxMaterialTimepickerModule
  ],
  exports:[mats,HttpClientModule],
  providers: [
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    { provide: MatSnackBarRef, useValue: {} },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000, verticalPosition: 'top' } }
  ],
  entryComponents:[DialogComponent,MysnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
