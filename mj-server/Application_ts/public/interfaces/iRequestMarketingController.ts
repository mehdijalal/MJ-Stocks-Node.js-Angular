export interface IRequestMarketing {
    getAllRequestMarketing(req:any, res:any,next:any): Promise<any>;
    getRequestMarektingByID(req?:any, res?:any,next?:any): Promise<any>;
    insertRequestMarketing(req?:any, res?:any,next?:any): Promise<any>;
    updateRequestMarketing(req?:any, res?:any,next?:any): Promise<any>;
    deleteRequestMarketing(req?:any, res?:any,next?:any): Promise<any>;
  }
  