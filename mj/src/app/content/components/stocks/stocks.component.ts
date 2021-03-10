import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { Router,ActivatedRoute} from '@angular/router';
//------------Dialog services-------------------------------------//
import { DialogService } from './../../../shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';

import { IStocks } from './../../models/stocks.model';

import { StocksService } from './../../services/stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  constructor(private stocksService:StocksService, 
    public dialog: MatDialog,
    private dialogService: DialogService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.refreshStocks();
  }

   refreshStocks(){
     console.log('---here ----');
    //  this.stocksService.getAllStocks('/stocks').subscribe((result)=>{
    //   console.log('-------hiii-------');
    //   console.log(result);
    // },error=>{
    //   console.log('-----error in please checkssss----------');
    //   console.log(error);
    // })

    this.stocksService.getAllStocks('/stocks/').subscribe(
      (modelData: IStocks[]) => {
        console.log('---coming here----');
       if(modelData){
        console.log(modelData);
 
       }
      },
      error => {
        const res = this.dialogService.ErrorDialog('Server Error', 'Sorry, the system is unavailable at the moment.', 'Close', 'Try again');
        res.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            //this.callNext(200);
            console.log('-------erroor ------------');
          }
        });
      }
    );
  }
}
