import { INewsFeedRepository } from '../interfaces/iNewsFeedRepository';
import { NewsFeed } from '../models/newsfeed';

// This is the mock repository class that retrieves data as JSON.

export class MockNewsFeedRepository implements INewsFeedRepository {
  // async getAllNewsFeeds(): Promise<NewsFeed[]> {
  //   let newsFeedJSONArray =
  //     '' +
  //     '[' +
  //     '{' +
  //     '"id":"1",' +
  //     '"title":"First Title",' +
  //     '"content": "First Content",' +
  //     '"author": "First Author",' +
  //     '"lastUpdatedDate": "01/01/2019",' +
  //     '"ispublished":"true"' +
  //     '},' +
  //     '{' +
  //     '"id":"2",' +
  //     '"title":"Second Title",' +
  //     '"content": "Second Content",' +
  //     '"author": "Second Author",' +
  //     '"lastUpdatedDate": "02/02/2019",' +
  //     '"ispublished":"false"' +
  //     '}' +
  //     ']';

  //   let newsFeeds = NewsFeed.MapObjectToArray(JSON.parse(newsFeedJSONArray));

  //   return newsFeeds;
  // }

  getAllNewsFeeds(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getAllPublishedNewsfeed(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getNewsFeedById(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  insertNewsfeed(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateNewsfeed(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  publishArchiveNewsfeed(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  deleteNewsFeed(): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
