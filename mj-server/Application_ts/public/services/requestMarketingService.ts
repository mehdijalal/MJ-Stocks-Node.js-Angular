import { IRequestMarketing } from '../interfaces/iRequestMarketingController';
//import { IAnnouncementRepository } from '../interfaces/iAnnouncementRepository';
import { RequestMarketingRepository } from '../repositories/requestMarketingRepository';

import { RequestMarketing } from '../models/requestMarketing';
//import { AutoMap } from '../common/autoMap';
//import * as js2xmlparser from 'js2xmlparser';
import { MockRequestMarketing } from '../repositories/mockRequestMarketingReqpository';
export class RequestMarketingService implements IRequestMarketing {
  private repo: IRequestMarketing;

 
  constructor() {
    let envName = process.env.ENV;

    if (envName !== 'test') {
      this.repo = new RequestMarketingRepository();
    } else {
      this.repo = new MockRequestMarketing();
      
    }
  }

  //
  async getAllRequestMarketing(req: any, res: any, next: any): Promise<any> {

    let requests: RequestMarketing[] = [];
    await this.repo
      .getAllRequestMarketing(req, res, next)
      .then(results => (requests = results))
      .catch(err => {
        next(err);
      });

    return requests;
  }

  async getRequestMarektingByID(req: any, res: any, next: any): Promise<any> {
    //let id = req.params.id;
    let requests = new RequestMarketing();

    await this.repo
      .getRequestMarektingByID(req,res,next)
      .then(result => {
        requests = result;
      })
      .catch(err => {
        next(err);
      });

    return requests;
  }

  async insertRequestMarketing(req: any, res: any, next: any): Promise<any>  {
    let requests;

    await this.repo
      .insertRequestMarketing(req,res,next)
      .then(result => {
        requests = result;
      })
      .catch(err => {
        next(err);
      });
    return requests;
  }
  async updateRequestMarketing(req: any, res: any, next: any): Promise<any>  {
    let requests = new RequestMarketing();
    await this.repo
      .updateRequestMarketing(req,res,next)
      .then(result => {
        requests = result;
      })
      .catch(err => {
        next(err);
      });

    return requests;
  }

  //------Delete newsfeed-------//
  async deleteRequestMarketing(req: any, res: any, next: any): Promise<any> {
    let bIsSuccess = false;
    await this.repo
      .deleteRequestMarketing(req,res,next)
      .then(result => {
        bIsSuccess = true;
      })
      .catch(err => {
        next(err);
      });

    return bIsSuccess;
  }
}
