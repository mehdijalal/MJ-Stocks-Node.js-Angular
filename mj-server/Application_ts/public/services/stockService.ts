import { IStocksRepository } from '../interfaces/iStocksRepository';
import { IStocksService } from '../interfaces/iStocksService';
import { Stocks } from '../models/stocks';
//import { MockNewsFeedRepository } from '../repositories/mockNewsFeedRepository';
import { StocksRepository } from '../repositories/stockRepository';


export class StockService implements IStocksService {
  private repo: IStocksRepository;

  constructor() {
    let envName = process.env.ENV;

    if (envName !== 'test') {
      this.repo = new StocksRepository();
    } else {
      //this.repo = new MockNewsFeedRepository();

    }
  }

  //
  async getAllStocks(req: any, res: any, next: any): Promise<any> {

    let newsFeeds: Stocks[] = [];
    await this.repo
      .getAllStocks(req, res, next)
      .then(results => (newsFeeds = results))
      .catch(err => {
        next(err);
      });

    return newsFeeds;
  }

}
