import { IAnnouncementService } from '../interfaces/iAnnouncementService';
import { IAnnouncementRepository } from '../interfaces/iAnnouncementRepository';
import { AnnouncementRepository } from '../repositories/announcementRepository';

import { Announcement } from '../models/announcement';
import { AutoMap } from '../common/autoMap';
import * as js2xmlparser from 'js2xmlparser';
import { MockAnnouncementRepository } from '../repositories/mockAnnouncementRepository';
export class AdminAnnouncementService implements IAnnouncementService {
  private repo: IAnnouncementRepository;

 
  constructor() {
    let envName = process.env.ENV;

    if (envName !== 'test') {
      this.repo = new AnnouncementRepository();
    } else {
      this.repo = new MockAnnouncementRepository();
      
    }
  }

  //
  async getAllAnnouncements(req: any, res: any, next: any): Promise<any> {

    let announcements: Announcement[] = [];
    await this.repo
      .getAllAnnouncements(req, res, next)
      .then(results => (announcements = results))
      .catch(err => {
        next(err);
      });

    return announcements;
  }

  async getAllPublishedAnnouncements(req: any, res: any, next: any): Promise<any> {

    let announcements: Announcement[] = [];
    await this.repo
      .getAllPublishedAnnouncements(req, res, next)
      .then(results => (announcements = results))
      .catch(err => {
        next(err);
      });

    return announcements;
  }
  //
  async getAnnouncementById(req: any, res: any, next: any): Promise<any> {
    //let id = req.params.id;
    let announcements = new Announcement();

    await this.repo
      .getAnnouncementById(req,res,next)
      .then(result => {
        announcements = result;
      })
      .catch(err => {
        next(err);
      });

    return announcements;
  }

  async insertAnnouncement(req: any, res: any, next: any): Promise<any>  {
    let announcements;

    await this.repo
      .insertAnnouncement(req,res,next)
      .then(result => {
        announcements = result;
      })
      .catch(err => {
        next(err);
      });
    return announcements;
  }
  async updateAnnouncement(req: any, res: any, next: any): Promise<any>  {
    let announcements = new Announcement();
    await this.repo
      .updateAnnouncement(req,res,next)
      .then(result => {
        announcements = result;
      })
      .catch(err => {
        next(err);
      });

    return announcements;
  }
  //-----------Archive publish --------//
  async publishArchiveAnnouncement(req: any, res: any, next: any): Promise<any>  {
    //let id = req.params.id;
    let announcements = new Announcement();

    await this.repo
      .publishArchiveAnnouncement(req,res,next)
      .then(result => {
        announcements = result;
      })
      .catch(err => {
        next(err);
      });

    return announcements;
  }
  //------Delete newsfeed-------//
  async deleteAnnouncement(req: any, res: any, next: any): Promise<any> {
    let bIsSuccess = false;
    await this.repo
      .deleteAnnouncement(req,res,next)
      .then(result => {
        bIsSuccess = true;
      })
      .catch(err => {
        next(err);
      });

    return bIsSuccess;
  }
}
