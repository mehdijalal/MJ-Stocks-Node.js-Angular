import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment, BuildEnvironment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  //"https://serverjanv1.azurewebsites.net/public/controllers/api";

  constructor(private http: HttpClient) {}

  //var tableArray:string[] = ['status','priority','country','province'];
  /*
   *---Note tablename should be one of the array elements above---//
   */
  getLookupByTableAlias(tablename): Observable<any> {
    const rootURL = BuildEnvironment.GetEnvironmentUrl();

    return this.http.get<any>(rootURL + '/lookups/tables/' + tablename);
  }
}
