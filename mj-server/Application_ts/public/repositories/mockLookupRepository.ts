import { ILookupRepository } from '../interfaces/iLookupRepository';
import { Lookup } from '../models/lookup';

// This is the mock repository class that retrieves data as JSON.

export class MockLookupRepository implements ILookupRepository {
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

  getAllLookupByTableNames(): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
