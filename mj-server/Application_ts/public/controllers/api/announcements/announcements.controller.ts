import { IAnnouncement } from '../../../interfaces/iAnnouncementController';
import { IAnnouncementService } from '../../../interfaces/iAnnouncementService';
import { AdminAnnouncementService } from '../../../services/adminAnnouncementService';

class adminAnnouncementController implements IAnnouncement {
  private service: IAnnouncementService;
  constructor(router) {
    this.service = new AdminAnnouncementService();
    router.get('/', this.getAllPublishedAnnouncements.bind(this));
    router.get('/allannouncement', this.getAllAnnouncements.bind(this));
    router.get('/:id', this.getAnnouncementById.bind(this));
    router.post('/insert', this.insertAnnouncement.bind(this));
    router.post('/update/:id', this.updateAnnouncement.bind(this));
    router.post('/publish/:id', this.publishArchiveAnnouncement.bind(this));
    router.delete('/:id', this.deleteAnnouncement.bind(this));


  }
  getAllAnnouncements(req: any, res: any, next: any): Promise<any> {
    return this.service
   .getAllAnnouncements(req, res, next)
   .then(results =>{
     res.json(results)
   })
   .catch(err => {
    next(err);
   });
}

getAllPublishedAnnouncements(req: any, res: any, next: any): Promise<any> {
return  this.service
   .getAllPublishedAnnouncements(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}

getAnnouncementById(req: any, res: any, next: any): Promise<any> {
 return this.service
   .getAnnouncementById(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}


insertAnnouncement(req: any, res: any, next: any): Promise<any> {
// console.log('--------ok inserts called--------');
 //console.log(req.body);
 return this.service
   .insertAnnouncement(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}
updateAnnouncement(req: any, res: any, next: any):  Promise<any> {
 return this.service
   .updateAnnouncement(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}
publishArchiveAnnouncement(req: any, res: any, next: any): Promise<any> {
 return this.service
   .publishArchiveAnnouncement(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}

deleteAnnouncement(req: any, res: any, next: any): Promise<any> {
 return this.service
   .deleteAnnouncement(req, res, next)
   .then(results => res.json(results))
   .catch(err => {
     next(err);
   });
}
}

module.exports = adminAnnouncementController;
