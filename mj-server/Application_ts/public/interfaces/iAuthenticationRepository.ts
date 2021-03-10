import { Resources } from '../models/resources';

export interface IAuthenticationRepository {
  
  verifyAccess(req:any, res:any,next:any): Promise<any>;
  
}
