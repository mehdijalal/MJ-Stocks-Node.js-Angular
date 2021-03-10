import { IResourcesRepository } from '../interfaces/iResourcesRepository';
import { IResourcesService } from '../interfaces/iResourcesService';
import { Resources } from '../models/resources';
import { ResourcesRepository } from '../repositories/resourcesRepository';
import { AutoMap } from '../common/autoMap';

// The service class implements the application business logic
// The service's responsabilities are the following:

//  -   to initiate the repository class
//  -   to call into the repository's methods to get and save the data as objects.
//  -   to execute the business logic that applied to the models.

//  The service class can be mocked and the client's functionality can be tested only
//  with the data retrieved from the mock service (JSON data) and therefore decoupled from the database.

// This service's methods called into the repository's methods that uses inline queries to communicate with the database.

export class ResourcesService implements IResourcesService {
  private repo: IResourcesRepository;

  
  constructor() {
      this.repo = new ResourcesRepository();

  }

  //
  async getAllResource(req: any, res: any, next: any): Promise<any> {

    let resource: Resources[] = [];
    await this.repo
      .getAllResource(req, res, next)
      .then(results => (resource = results))
      .catch(err => {
        next(err);
      });

    return resource;
  }

  async getAllPublishedResource(req: any, res: any, next: any): Promise<any> {

    let resource: Resources[] = [];
    await this.repo
      .getAllPublishedResource(req, res, next)
      .then(results => (resource = results))
      .catch(err => {
        next(err);
      });

    return resource;
  }
  //
  async getResourceById(req: any, res: any, next: any): Promise<any> {
    //let id = req.params.id;

    let resource = new Resources();

    await this.repo
      .getResourceById(req,res,next)
      .then(result => {
        resource = result;
      })
      .catch(err => {
        next(err);
      });

    return resource;
  }

  async saveOrUpdateResources(req: any, res: any, resource:any, fileName:string, next: any): Promise<any> 
  {
    let resourceId: Number;
    let resources: Resources = new Resources();

    AutoMap.Map(resources, req.body);

    resource.SetDefaults();
    resource.SetIsDeleted(req.hasBeenDeleted);

    let userName = req.authInfo.name;

    await this.repo
      .saveResources(resource, userName)
      .then(result => {
        resourceId = result;
      })
      .catch(err => {
        next(err);
      });

    return resourceId;
  }

  async getNumberOfRecordsForAFileWithID(fileName:string,ResourceID:number, next: any): Promise<any> {

    var rowsCount: any = 0;

    await this.repo
      .getNumberOfRecordsForAFileWithID(fileName,ResourceID)
      .then(result => {
        rowsCount = result;
      })
      .catch(err => {
        next(err);
      });

    return rowsCount;
  }
  async getOldFileName(ResourceID:number, next: any): Promise<any> {
    try{
      var rowsCount: any = 0;

      await this.repo
        .getOldFileName(ResourceID,next)
        .then(result => {
          rowsCount = result;
        })
        .catch(err => {
          next(err);
        });
  
      return rowsCount;
    }catch(err){
      console.log(err);
    }
  }
  async getNumberOfRecordsForAFile(fileName:string, next: any): Promise<any> {

    var rowsCount: any = 0;

    await this.repo
      .getNumberOfRecordsForAFile(fileName)
      .then(result => {
        rowsCount = result;
      })
      .catch(err => {
        next(err);
      });

    return rowsCount;
  }

  async insertResource(req: any, res: any, next: any): Promise<any>  {
    let resource;

    await this.repo
      .insertResource(req,res,next)
      .then(result => {
        resource = result;
      })
      .catch(err => {
        next(err);
      });
    return resource;
  }
  async updateResource(req: any, res: any, next: any): Promise<any>  {
    let resource = new Resources();
    await this.repo
      .updateResource(req,res,next)
      .then(result => {
        resource = result;
      })
      .catch(err => {
        next(err);
      });

    return resource;
  }
  //-----------Archive publish --------//
  async publishArchiveResource(req: any, res: any, next: any): Promise<any>  {
    //let id = req.params.id;
    let resource = new Resources();

    await this.repo
      .publishArchiveResource(req,res,next)
      .then(result => {
        resource = result;
      })
      .catch(err => {
        next(err);
      });

    return resource;
  }
  //------Delete resource-------//
  async deleteResource(req: any, res: any, next: any): Promise<any> {
    let bIsSuccess = false;
    await this.repo
      .deleteResource(req,res,next)
      .then(result => {
        bIsSuccess = true;
      })
      .catch(err => {
        next(err);
      });

    return bIsSuccess;
  }
  
}
