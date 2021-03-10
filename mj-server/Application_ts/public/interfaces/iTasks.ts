export interface ITasks {
    getMyGroupedTasksByDueDate(req:any, res:any,next:any): Promise<any>;
    getMyGroupedPendingTasksBetweenDates(req:any, res:any,next:any): Promise<any>;
    getAllMyTasksBetweenDates(req:any, res:any,next:any): Promise<any>;
    getTaskByCategoryIdAndDueDate(req?:any, res?:any,next?:any): Promise<any>;
    getTaskByCategoryIdStartEndDate(req?:any, res?:any,next?:any): Promise<any>;
    getTaskByStatusTypeStartEndDate(req?:any, res?:any,next?:any): Promise<any>;

    getAllTasks(req:any, res:any,next:any): Promise<any>;
    getAllMyPendingTasks(req:any, res:any,next:any): Promise<any>;
    getCompletedTasks(req?:any, res?:any,next?:any): Promise<any>;
    getCurrentTasks(req?:any, res?:any,next?:any): Promise<any>;
    getTaskById(req?:any, res?:any,next?:any): Promise<any>;
    viewTasks(req?:any, res?:any,next?:any): Promise<any>;
    insertTasks(req?:any, res?:any,next?:any): Promise<any>;
    updateTasks(req?:any, res?:any,next?:any): Promise<any>;
    updateStatus(req?:any, res?:any,next?:any): Promise<any>;
    deleteTasks(req?:any, res?:any,next?:any): Promise<any>;
    deleteFutureOccurenceBySeriesID(req?:any, res?:any,next?:any): Promise<any>;
    deleteAll(req?:any, res?:any,next?:any): Promise<any>;
  }
  
export interface IOfficeTasks {
    getAllTasks(req:any, res:any,next:any): Promise<any>;
    getCompletedTasks(req?:any, res?:any,next?:any): Promise<any>;
    getCurrentTasks(req?:any, res?:any,next?:any): Promise<any>;
    getTaskById(req?:any, res?:any,next?:any): Promise<any>;
    viewTasks(req?:any, res?:any,next?:any): Promise<any>;
    insertTasks(req?:any, res?:any,next?:any): Promise<any>;
    updateTasks(req?:any, res?:any,next?:any): Promise<any>;
    updateStatus(req?:any, res?:any,next?:any): Promise<any>;
    deleteTasks(req?:any, res?:any,next?:any): Promise<any>;
    deleteAll(req?:any, res?:any,next?:any): Promise<any>;
  }
  