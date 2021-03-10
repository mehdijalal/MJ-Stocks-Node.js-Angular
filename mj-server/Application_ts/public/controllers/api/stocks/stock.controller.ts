import { IStocks } from '../../../interfaces/iStocksController';
import { IStocksService } from '../../../interfaces/iStocksService';
import { StockService } from '../../../services/stockService';
import { Stocks } from '../../../models/stocks';

 //var google = require("google-finance-data");
// var googleFinance = require('google-finance');
// var yahooStockPrices = require('yahoo-stock-prices');

class StockController implements IStocks {
  private service: IStocksService;

  constructor(router) {
    this.service = new StockService();

    router.get('/', this.getAllStocks.bind(this));
    // router.get('/allnewsfeeds', this.getAllNewsFeeds.bind(this));
    // router.get('/:id', this.getNewsFeedById.bind(this));
    // router.post('/insert', this.insertNewsfeed.bind(this));
    // router.post('/update/:id', this.updateNewsfeed.bind(this));
    // router.post('/publish/:id', this.publishArchiveNewsfeed.bind(this));
    // //router.post('/saveNewsFeed/:id', this.saveNewsFeed.bind(this));
    // router.delete('/:id', this.deleteNewsFeed.bind(this));
  }

  // getAllStocks2(req:any,res:any, next:any):Promise<any>{
  //    return google.getSymbol("msft")
  //                 .then(data => console.log(JSON.stringify(data, null, 2)))
  //                 .catch(err => console.error(err.stack ? err.stack : err));
  // }
  // getAllStocks(req:any,res:any, next:any):Promise<any>{
  //    return googleFinance.companyNews({
  //     symbol: 'NASDAQ:AAPL'
  //   }, function (err, news) {
  //     if(err) {
  //       console.log(err);
  //     }else{
  //       console.log('-----------ss--');
  //       console.log(news);
  //     }
  //   });
  // }
    getAllStocks(req: any, res: any, next: any): Promise<any> {
      return this.service
     .getAllStocks(req, res, next)
     .then(results =>{
       res.json(results)
     })
     .catch(err => {
      console.log(err)
     });
  }



}

module.exports = StockController;
