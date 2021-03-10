import { ITasks } from '../../../interfaces/iTasks';
import { TasksService } from '../../../services/taskService';

class TasksController implements ITasks {
    private service: ITasks;
    constructor(router) {
        this.service = new TasksService();
      

        router.get('/', this.getAllTasks.bind(this));
        router.get('/getallmypendingtasks', this.getAllMyPendingTasks.bind(this));
        router.get('/groupedtasksbyduedate/:duedate', this.getMyGroupedTasksByDueDate.bind(this));
        router.get('/groupedpendingtasksbetweendates/:startdate/:enddate', this.getMyGroupedPendingTasksBetweenDates.bind(this));
        router.get('/getallmytasksbetweendates/:startdate/:enddate', this.getAllMyTasksBetweenDates.bind(this));
        router.get('/category/:categoryId/:DueDate', this.getTaskByCategoryIdAndDueDate.bind(this));
        router.get('/categorywithstartend/:categoryId/:startdate/:enddate', this.getTaskByCategoryIdStartEndDate.bind(this));
        router.get('/status/:statustype/:startdate/:enddate', this.getTaskByStatusTypeStartEndDate.bind(this));
        router.get('/current', this.getCurrentTasks.bind(this));
        router.get('/complete', this.getCompletedTasks.bind(this));
        router.get('/view/:id', this.viewTasks.bind(this));
        router.get('/:id', this.getTaskById.bind(this));
        router.post('/insert', this.insertTasks.bind(this));
        router.post('/update/:id', this.updateTasks.bind(this));
        router.post('/updatestatus/:id', this.updateStatus.bind(this));
        router.post('/deleteall', this.deleteAll.bind(this));
        router.delete('/:id', this.deleteTasks.bind(this));
        router.delete('/deletefutureoccurence/:id', this.deleteFutureOccurenceBySeriesID.bind(this));
       
    }
    
    getMyGroupedTasksByDueDate(req: any, res: any, next: any): Promise<any> {
        return this.service
        .getMyGroupedTasksByDueDate(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getMyGroupedPendingTasksBetweenDates(req: any, res: any, next: any): Promise<any> {
        return this.service
        .getMyGroupedPendingTasksBetweenDates(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getAllMyTasksBetweenDates(req: any, res: any, next: any): Promise<any> {
        return this.service
        .getAllMyTasksBetweenDates(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getAllTasks(req: any, res: any, next: any): Promise<any> {
        console.log('-----all tasks------');
        return this.service
        .getAllTasks(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getAllMyPendingTasks(req: any, res: any, next: any): Promise<any> {
        console.log('-----all my pending tasks------');
        return this.service
        .getAllMyPendingTasks(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getCurrentTasks(req: any, res: any, next: any): Promise<any> {
        console.log('-----current tasks------');
        return this.service
        .getCurrentTasks(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getCompletedTasks(req: any, res: any, next: any): Promise<any> {
        console.log('-----completed tasks------');
        return this.service
        .getCompletedTasks(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getTaskByCategoryIdAndDueDate(req: any, res: any, next: any): Promise<any> {
        console.log('---geting by category id and due date----');
        return this.service
        .getTaskByCategoryIdAndDueDate(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getTaskByCategoryIdStartEndDate(req: any, res: any, next: any): Promise<any> {
        console.log('---geting startdate enddate----');
        return this.service
        .getTaskByCategoryIdStartEndDate(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getTaskByStatusTypeStartEndDate(req: any, res: any, next: any): Promise<any> {
        console.log('---geting by Status type startdate and enddate----');
        return this.service
        .getTaskByStatusTypeStartEndDate(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getTaskById(req: any, res: any, next: any): Promise<any> {
        console.log('--------get task by id-------');
        return this.service
        .getTaskById(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    viewTasks(req: any, res: any, next: any): Promise<any> {
        console.log('-----view tasks------');
        return this.service
        .viewTasks(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    
    insertTasks(req: any, res: any, next: any): Promise<any> {
        return this.service
        .insertTasks(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
    updateTasks(req: any, res: any, next: any):  Promise<any> {
        return this.service
        .updateTasks(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
    updateStatus(req: any, res: any, next: any):  Promise<any> {
        return this.service
        .updateStatus(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }


    deleteTasks(req: any, res: any, next: any): Promise<any> {
        console.log('----delete task by id-----');
        return this.service
        .deleteTasks(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
    deleteFutureOccurenceBySeriesID(req: any, res: any, next: any): Promise<any> {
        console.log('-------delete future occurence-----');
        return this.service
        .deleteFutureOccurenceBySeriesID(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
    deleteAll(req: any, res: any, next: any): Promise<any> {
        return this.service
        .deleteAll(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
}

module.exports = TasksController;
