import { Announcement } from '../models/announcement';

export interface IAnnouncementRepository {
  getAllAnnouncements(req:any, res:any,next:any): Promise<any>;
  getAllPublishedAnnouncements(req?:any, res?:any,next?:any): Promise<any>;
  getAnnouncementById(req?:any, res?:any,next?:any): Promise<any>;
  insertAnnouncement(req?:any, res?:any,next?:any): Promise<any>;
  updateAnnouncement(req?:any, res?:any,next?:any): Promise<any>;
  publishArchiveAnnouncement(req?:any, res?:any,next?:any): Promise<any>;
  deleteAnnouncement(req?:any, res?:any,next?:any): Promise<any>;
}
