import { IRequestMarketing } from '../../../interfaces/iRequestMarketingController';
//import { IAnnouncementService } from '../../../interfaces/iAnnouncementService';
import { RequestMarketingService } from '../../../services/requestMarketingService';

class AdminRequestMarketingController implements IRequestMarketing {
  private service: IRequestMarketing;
  constructor(router) {
    this.service = new RequestMarketingService();
    router.get('/', this.getAllRequestMarketing.bind(this));
    router.get('/:id', this.getRequestMarektingByID.bind(this));
    router.post('/insert', this.insertRequestMarketing.bind(this));
    router.post('/update/:id', this.updateRequestMarketing.bind(this));
    router.delete('/:id', this.deleteRequestMarketing.bind(this));


  }
  getAllRequestMarketing(req: any, res: any, next: any): Promise<any> {
    return this.service
   .getAllRequestMarketing(req, res, next)
   .then(results =>{
     res.json(results)
   })
   .catch(err => {
    next(err);
   });
}

getRequestMarektingByID(req: any, res: any, next: any): Promise<any> {
 return this.service
   .getRequestMarektingByID(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}


insertRequestMarketing(req: any, res: any, next: any): Promise<any> {
// console.log('--------ok inserts called--------');
 return this.service
   .insertRequestMarketing(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}
updateRequestMarketing(req: any, res: any, next: any):  Promise<any> {
 return this.service
   .updateRequestMarketing(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}


deleteRequestMarketing(req: any, res: any, next: any): Promise<any> {
 return this.service
   .deleteRequestMarketing(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}
}

module.exports = AdminRequestMarketingController;
