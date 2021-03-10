import { Resources } from '../models/resources';

export interface IResourcesService {
  
  //getAllResources(req: any, res: any, next: any): Promise<Resources[]>;
  //getResourcesById(req: any, res: any, next: any): Promise<Resources>;
  //saveResources(req: any, res: any, next: any): Promise<Resources>;
  //saveOrUpdateResources(req: any, res: any, resource:any, fileName:string, next: any): Promise<any>;
  //deleteResources(req: any, res: any, next: any): Promise<boolean>;
  //getNumberOfRecordsForAFile(fileName:string, next: any): Promise<any>;

  //-----------New-------------------//
  getAllResource(req:any, res:any,next:any): Promise<any>;
  getAllPublishedResource(req?:any, res?:any,next?:any): Promise<any>;
  getResourceById(req?:any, res?:any,next?:any): Promise<any>;
  insertResource(req?:any, res?:any,next?:any): Promise<any>;
  updateResource(req?:any, res?:any,next?:any): Promise<any>;
  saveOrUpdateResources(req: any, res: any, resource:any, fileName:string, next: any): Promise<any>;
  publishArchiveResource(req?:any, res?:any,next?:any): Promise<any>;
  deleteResource(req?:any , res?:any,next?:any): Promise<any>;
  getNumberOfRecordsForAFile(fileName:string, next: any): Promise<any>;
  getNumberOfRecordsForAFileWithID(fileName:string,id:number, next: any): Promise<any>;
  getOldFileName(id:number, next: any): Promise<any>;

}
