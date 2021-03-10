import { Resources } from '../models/resources';

export interface IResourcesRepository {
  //getAllResources(): Promise<Resources[]>;
  //getResourcesById(id: Number): Promise<Resources>;
  //saveResources(feed: Resources): Promise<any>;
  //deleteResources(id: Number): Promise<boolean>;
  //getNumberOfRecordsForAFile(fileName:string): Promise<Number>;

  //-----------New-------------------//
  getAllResource(req:any, res:any,next:any): Promise<any>;
  getAllPublishedResource(req?:any, res?:any,next?:any): Promise<any>;
  getResourceById(req?:any, res?:any,next?:any): Promise<any>;
  insertResource(req?:any, res?:any,next?:any): Promise<any>;
  updateResource(req?:any, res?:any,next?:any): Promise<any>;
  publishArchiveResource(req?:any, res?:any,next?:any): Promise<any>;
  deleteResource(req?:any , res?:any,next?:any): Promise<any>;
  saveResources(resource: Resources, userName:string): Promise<any>;
  getNumberOfRecordsForAFile(fileName:string): Promise<Number>;
  getNumberOfRecordsForAFileWithID(fileName:string, id:number): Promise<Number>;
  getOldFileName(id:number,next:any): Promise<any>;
}
