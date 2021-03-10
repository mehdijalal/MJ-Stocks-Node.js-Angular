import { LogErrors } from '../common/logErrors.controller';
import { Stocks } from '../models/stocks';
import { DataFormatter } from '../providers/dataFormatter/dbFormatData';

var google = require("google-finance-data");
//var googleFinance = require('google-finance');
//var yahooStockPrices = require('yahoo-stock-prices');

// The repository class implements the calls to the database.
// The repository class's responsabilities are the following:

//  -   make use of the SQLDBProvider class to call into the database.
//  -   execute calls to the database via methods that uses stored procedures or
//  -   via methods that uses inline queries.

//  The repository class methods catch the database errors and logged the errors into the database (table dbo.Errors)

export class StocksRepository {
  constructor() {}

  public async getAllStocks(req:any,res:any,next:any): Promise<any> {

    let newFeedsArray: Stocks[] = [];
    
    await google.getSymbol('din')
           .then(data => {
             if(data){
               newFeedsArray = data;
             }
           })
           .catch(err => console.error(err.stack ? err.stack : err));
           return newFeedsArray;
  }

}
