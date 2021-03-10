export interface IAuthentication {

   verifyAccess(req:any, res:any,next:any): Promise<any>;

}
