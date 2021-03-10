
export interface IAuthenticationService {
  
  verifyAccess(req:any, res:any,next:any): Promise<any>;

}
