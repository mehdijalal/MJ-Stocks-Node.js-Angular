import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';

import { TasksService } from './tasks.service';


@Injectable({
  providedIn: 'root'
})
export class TaskresolverserviceService implements Resolve<any> {

  constructor(private service:TasksService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    return this.service.getAllTasks('/tasks/');
  }
}
