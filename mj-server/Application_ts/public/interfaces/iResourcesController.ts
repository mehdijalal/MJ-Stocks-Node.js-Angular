export interface IResources {
  // getAllResources(req: any, res: any, next: any): Promise<any[]>;
  // getResourcesById(req: any, res: any, next: any): Promise<any>;
  // saveResources(req: any, res: any, next: any): Promise<any>;
  // saveOrUpdateResources(req: any, res: any, resource:any, fileName:string, next: any): Promise<any>;
  // deleteResources(req: any, res: any, next: any): Promise<boolean>;
  // getNumberOfRecordsForAFile(fileName:string, next: any): Promise<any>;

   //-----------New-------------------//
   getAllResource(req:any, res:any,next:any): Promise<any>;
   getAllPublishedResource(req?:any, res?:any,next?:any): Promise<any>;
   getResourceById(req?:any, res?:any,next?:any): Promise<any>;
   insertResource(req?:any, res?:any,next?:any): Promise<any>;
   updateResource(req?:any, res?:any,next?:any): Promise<any>;
   publishArchiveResource(req?:any, res?:any,next?:any): Promise<any>;
   deleteResource(req?:any , res?:any,next?:any): Promise<any>;
}
