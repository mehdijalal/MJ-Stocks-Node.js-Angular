import { IAnnouncementRepository } from '../interfaces/iAnnouncementRepository';
import { Announcement } from '../models/announcement';

// This is the mock repository class that retrieves data as JSON.

export class MockAnnouncementRepository implements IAnnouncementRepository {
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

  getAllAnnouncements(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getAllPublishedAnnouncements(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getAnnouncementById(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  insertAnnouncement(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateAnnouncement(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  publishArchiveAnnouncement(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  deleteAnnouncement(): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
