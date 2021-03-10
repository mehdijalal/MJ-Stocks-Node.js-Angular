import { INewsFeedRepository } from '../interfaces/iNewsFeedRepository';
import { INewsFeedService } from '../interfaces/iNewsFeedService';
import { NewsFeed } from '../models/newsfeed';
import { MockNewsFeedRepository } from '../repositories/mockNewsFeedRepository';
import { NewsFeedRepository } from '../repositories/newsfeedRepository';


export class NewsFeedService implements INewsFeedService {
  private repo: INewsFeedRepository;

  constructor() {
    let envName = process.env.ENV;

    if (envName !== 'test') {
      this.repo = new NewsFeedRepository();
    } else {
      this.repo = new MockNewsFeedRepository();

    }
  }

  //
  async getAllNewsFeeds(req: any, res: any, next: any): Promise<any> {

    let newsFeeds: NewsFeed[] = [];
    await this.repo
      .getAllNewsFeeds(req, res, next)
      .then(results => (newsFeeds = results))
      .catch(err => {
        next(err);
      });

    return newsFeeds;
  }

  async getAllPublishedNewsfeed(req: any, res: any, next: any): Promise<any> {

    let newsFeeds: NewsFeed[] = [];
    await this.repo
      .getAllPublishedNewsfeed(req, res, next)
      .then(results => (newsFeeds = results))
      .catch(err => {
        next(err);
      });

    return newsFeeds;
  }
  //
  async getNewsFeedById(req: any, res: any, next: any): Promise<any> {
    //let id = req.params.id;
    let newsFeed = new NewsFeed();

    await this.repo
      .getNewsFeedById(req, res, next)
      .then(result => {
        newsFeed = result;
      })
      .catch(err => {
        next(err);
      });

    return newsFeed;
  }

  async insertNewsfeed(req: any, res: any, next: any): Promise<any> {
    let newsFeed;

    await this.repo
      .insertNewsfeed(req, res, next)
      .then(result => {
        newsFeed = result;
      })
      .catch(err => {
        next(err);
      });
    return newsFeed;
  }
  async updateNewsfeed(req: any, res: any, next: any): Promise<any> {
    let newsFeed = new NewsFeed();
    await this.repo
      .updateNewsfeed(req, res, next)
      .then(result => {
        newsFeed = result;
      })
      .catch(err => {
        next(err);
      });

    return newsFeed;
  }
  //-----------Archive publish --------//
  async publishArchiveNewsfeed(req: any, res: any, next: any): Promise<any> {
    //let id = req.params.id;
    let newsFeed = new NewsFeed();

    await this.repo
      .publishArchiveNewsfeed(req, res, next)
      .then(result => {
        newsFeed = result;
      })
      .catch(err => {
        next(err);
      });

    return newsFeed;
  }
  //------Delete newsfeed-------//
  async deleteNewsFeed(req: any, res: any, next: any): Promise<any> {
    let bIsSuccess = false;
    await this.repo
      .deleteNewsFeed(req, res, next)
      .then(result => {
        bIsSuccess = true;
      })
      .catch(err => {
        next(err);
      });

    return bIsSuccess;
  }
}
