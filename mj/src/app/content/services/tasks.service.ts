import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
//import { Observable, throwError } from 'rxjs';
//import { catchError, tap, map } from 'rxjs/operators';
// import { IAnnouncement } from "../models/announcement.model";
import { BuildEnvironment } from '../../../environments/environment';
// import { error } from 'protractor';
// import 'rxjs/add/operator/catch';
 //import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseurl: string;

  constructor(private http: HttpClient) {
    const rootURL = BuildEnvironment.GetEnvironmentUrl();
    this.baseurl = rootURL;
  }

  getAllTasks(urn: string) {
    return this.http.get(this.baseurl + urn);
  }
  getAllMyPendingTasks(urn: string) {
    return this.http.get(this.baseurl + urn);
  }
  getAllTasksByCategoryID(categoryID:number,DueDate,urn: string) {
    return this.http.get(this.baseurl + urn +categoryID+'/'+DueDate);
  }
  getAllTasksByCategoryIdStartdateEnddate(categoryID:number,startdate,enddate,urn: string) {
    return this.http.get(this.baseurl + urn +categoryID+'/'+startdate+'/'+enddate);
  }
  getAlldataWithStatusStartdateEnddate(statusType,startdate,enddate,urn: string) {
    return this.http.get(this.baseurl + urn +statusType+'/'+startdate+'/'+enddate);
  }
  getTaskById(id: number, urn: string){
    try {
      return this.http.get(this.baseurl + urn + id);
    } catch (err) {
      console.log('---------Unexpected error occured-------');
    }
  }

  insertTask(formdata: any, urn: string) {
    try {
      return this.http.post(this.baseurl + urn, formdata);
    } catch (err) {
      console.log('-------Error occurred posting----' + err);
    }
  }

  updateStatus(formdata: any, id: number, urn: string) {
    try {
      return this.http.post(this.baseurl + urn + id, formdata);
      //.subscribe(result => console.log(result));
    } catch (err) {
      //this.handleError(err);
      console.log(err);
    }
  }
  updateTask(formdata: any, id: number, urn: string) {
    try {
      return this.http.post(this.baseurl + urn + id, formdata);
      //.subscribe(result => console.log(result));
    } catch (err) {
      //this.handleError(err);
      console.log(err);
    }
  }

  insertRecord(formdata: any, urn: string) {
    try {
      return this.http.post(this.baseurl + urn, formdata);
    } catch (err) {
      console.log('-------Error occurred posting----' + err);
    }
  }
  updateData(formdata: any, id: number, urn: string) {
    try {
      return this.http.post(this.baseurl + urn + id, formdata);
      //.subscribe(result => console.log(result));
    } catch (err) {
      //this.handleError(err);
      console.log(err);
    }
  }
  //---delete task------//
  deleteTaskById(id, urn: string) {
    return this.http.delete(this.baseurl + urn + id, {
      headers: {},
      params: { TaskId: id }
    });
  }
  deleteAllTaskBySeriesId(Seriesid, urn: string) {
    return this.http.delete(this.baseurl + urn + Seriesid, {
      headers: {},
      params: { TaskId: Seriesid }
    });
  }

  deleteAll(list:any,uri:string) {
    console.log('---delete is called----');
    return this.http.post(this.baseurl + uri,list);
  }

  // private handleError(err: HttpErrorResponse) {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
}
