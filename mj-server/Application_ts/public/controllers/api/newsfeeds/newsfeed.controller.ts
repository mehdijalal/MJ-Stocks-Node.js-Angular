import { INewsFeed } from '../../../interfaces/iNewsFeedController';
import { INewsFeedService } from '../../../interfaces/iNewsFeedService';
import { NewsFeedService } from '../../../services/newsFeedService';

// The controller class is the entry point for the API calls.
// The controller's responsabilities are the following:

//      -   to implement the API calls.
//      -   to initiate the service class.
//      -   to call into the appropriate methods of the service class.
//      -   to return the service's methods results to the client.

// The controller is agnostic of the logic the service implements.
// The APIs are called via the following route: http://localhost:5200/newsfeed/

class NewsFeedController implements INewsFeed {
  private service: INewsFeedService;

  constructor(router) {
    this.service = new NewsFeedService();

    router.get('/', this.getAllPublishedNewsfeed.bind(this));
    router.get('/allnewsfeeds', this.getAllNewsFeeds.bind(this));
    router.get('/:id', this.getNewsFeedById.bind(this));
    router.post('/insert', this.insertNewsfeed.bind(this));
    router.post('/update/:id', this.updateNewsfeed.bind(this));
    router.post('/publish/:id', this.publishArchiveNewsfeed.bind(this));
    //router.post('/saveNewsFeed/:id', this.saveNewsFeed.bind(this));
    router.delete('/:id', this.deleteNewsFeed.bind(this));
  }

  getAllNewsFeeds(req: any, res: any, next: any): Promise<any> {
       return this.service
      .getAllNewsFeeds(req, res, next)
      .then(results =>{
        res.json(results)
      })
      .catch(err => {
       console.log(err)
      });
  }

  getAllPublishedNewsfeed(req: any, res: any, next: any): Promise<any> {
   return  this.service
      .getAllPublishedNewsfeed(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }

  getNewsFeedById(req: any, res: any, next: any): Promise<any> {
    return this.service
      .getNewsFeedById(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }


  insertNewsfeed(req: any, res: any, next: any): Promise<any> {
   // console.log('--------ok inserts called--------');
    //console.log(req.body);
    return this.service
      .insertNewsfeed(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }
  updateNewsfeed(req: any, res: any, next: any):  Promise<any> {
    return this.service
      .updateNewsfeed(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }
  publishArchiveNewsfeed(req: any, res: any, next: any): Promise<any> {
    return this.service
      .publishArchiveNewsfeed(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }

  deleteNewsFeed(req: any, res: any, next: any): Promise<any> {
    return this.service
      .deleteNewsFeed(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }
}

module.exports = NewsFeedController;
