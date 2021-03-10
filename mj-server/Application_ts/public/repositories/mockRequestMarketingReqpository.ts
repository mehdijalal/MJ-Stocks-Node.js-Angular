import { IRequestMarketing } from '../interfaces/iRequestMarketingController';
import { RequestMarketing } from '../models/requestMarketing';

// This is the mock repository class that retrieves data as JSON.

export class MockRequestMarketing implements IRequestMarketing {

    getAllRequestMarketing(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getRequestMarektingByID(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  insertRequestMarketing(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateRequestMarketing(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  deleteRequestMarketing(): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
