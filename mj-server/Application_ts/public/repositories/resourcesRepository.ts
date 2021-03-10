import * as sql from 'mssql';
import { SQLDBProvider } from '../providers/dbProvider/sqlDBProvider';
import { IResourcesRepository } from '../interfaces/iResourcesRepository';
import { Resources } from '../models/resources';
import { LogErrors } from '../common/logErrors.controller';
import { DataFormatter } from '../providers/dataFormatter/dbFormatData';


// The repository class implements the calls to the database.
// The repository class's responsabilities are the following:

//  -   make use of the SQLDBProvider class to call into the database.
//  -   execute calls to the database via methods that uses stored procedures or
//  -   via methods that uses inline queries.

//  The repository class methods catch the database errors and logged the errors into the database (table dbo.Errors)

export class ResourcesRepository implements IResourcesRepository {
  constructor() { }


  public async getAllResource(req: any, res: any, next: any): Promise<any> {


    let newFeedsArray: Resources[] = [];
    let provider = new SQLDBProvider();
    let inputParameters: any[] = [];
    let CustomQuery = `SELECT nf.*, st.Name, sr.Name AS SourceName
    FROM IAP.AA_Resource  AS nf 
    LEFT JOIN IAP.AA_Lookup_Status AS st ON nf.StatusID = st.ID
    LEFT JOIN IAP.AA_Lookup_Source AS sr ON nf.SourceID = sr.ID
    ORDER BY nf.Priority ASC`;
    await provider
      .executeQuery(CustomQuery)
      .then(results => {
        if (results) {
          newFeedsArray = Resources.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return newFeedsArray;
  }

  public async getAllPublishedResource(): Promise<any> {

    let newFeedsArray: Resources[] = [];
    let provider = new SQLDBProvider();
    let inputParameters: any[] = [];
    let CustomQuery = `SELECT nf.*, st.Name, sr.Name AS SourceName
    FROM IAP.AA_Resource  AS nf 
    LEFT JOIN IAP.AA_Lookup_Status AS st ON nf.StatusID = st.ID
    LEFT JOIN IAP.AA_Lookup_Source AS sr ON nf.SourceID = sr.ID
    WHERE st.Name= 'Published'
    ORDER BY nf.Priority ASC, nf.ResourceID DESC`;
    await provider
      .executeQuery(CustomQuery)
      .then(results => {
        if (results) {
          newFeedsArray = Resources.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return newFeedsArray;
  }

  public async getResourceById(req: any, res: any, next: any): Promise<any> {
    let provider = new SQLDBProvider();
    let resource: Resources = new Resources();
    let id = req.params.id;
    console.log(id);
    let inputParameters = [{ name: 'id', dataType: sql.Int, value: id }];
    let CustomQuery = `SELECT nf.*, st.Name, sr.Name AS SourceName
    FROM IAP.AA_Resource  AS nf 
    LEFT JOIN IAP.AA_Lookup_Status AS st ON nf.StatusID = st.ID 
    LEFT JOIN IAP.AA_Lookup_Source AS sr ON nf.SourceID = sr.ID
    WHERE nf.ResourceID = @id;`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          resource = Resources.MapDBToObject(results.recordset[0]);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return [resource];
  }

  public async insertResource(req: any, res: any) {
    let body = req.body;
    console.log(body);
    let CreatedBy = req.authInfo.name;
    let ModifiedBy = req.authInfo.name;
    let CreatedDate = new Date();
    let ModifiedDate = new Date();

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'Priority', dataType: sql.VarChar, value: body.Priority },
      { name: 'StatusID', dataType: sql.Int, value: 1 },
      { name: 'DisplayName', dataType: sql.VarChar, value: body.DisplayName },
      { name: 'Link', dataType: sql.VarChar, value: body.linkCtrl },
      { name: 'Description', dataType: sql.VarChar, value: body.Description },
      { name: 'CreatedDate', dataType: sql.DateTime, value: CreatedDate },
      { name: 'ModifiedDate', dataType: sql.DateTime, value: ModifiedDate },
      { name: 'CreatedBy', dataType: sql.VarChar, value: CreatedBy },
      { name: 'ModifiedBy', dataType: sql.VarChar, value: ModifiedBy },

    ];
    let CustomQuery = `INSERT INTO IAP.AA_Resource 
    (Priority, StatusID, DisplayName, Link, Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy )
     VALUES 
    (@Priority, @StatusID, @DisplayName, @Link, @Description, @CreatedDate, @ModifiedDate, @CreatedBy, @ModifiedBy); SELECT @@IDENTITY AS id`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      LogErrors.logErrors(err);
    });
    if (result.recordset[0].id) {
      return result.recordset[0].id;
    } else {
      throw new console.error('error inserting resource');
    }

  }

  public async updateResource(req: any, res: any) {
    //let returnValue: boolean = true;
    let body = req.body;
    console.log(body);
    let ModifiedBy = req.authInfo.name;
    let ModifiedDate = new Date();

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'ResourceID', dataType: sql.VarChar, value: body.ResourceID },
      { name: 'Priority', dataType: sql.VarChar, value: body.Priority },
      { name: 'StatusID', dataType: sql.Int, value: 1 },
      { name: 'DisplayName', dataType: sql.VarChar, value: body.DisplayName },
      { name: 'Link', dataType: sql.VarChar, value: body.linkCtrl },
      { name: 'Description', dataType: sql.VarChar, value: body.Description },
      { name: 'ModifiedDate', dataType: sql.DateTime, value: ModifiedDate },
      { name: 'ModifiedBy', dataType: sql.VarChar, value: ModifiedBy },

    ];
    let CustomQuery = `UPDATE IAP.AA_Resource 
    SET Priority = @Priority, 
        DisplayName = @DisplayName, 
        Link = @Link,
        Description = @Description, 
        ModifiedDate = @ModifiedDate
    WHERE ResourceID = @ResourceID`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    if (result.rowsAffected[0] > 0) {
      return result.rowsAffected[0];
    } else {
      throw new console.error('Un expected error, updating resources');
    }

  }

  public async publishArchiveResource(req: any, res: any) {
    //let returnValue: boolean = true;
    let body = req.body;
    console.log(body);
    let ModifiedBy = req.authInfo.name;
    let ModifiedDate = new Date();

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'ResourceID', dataType: sql.Int, value: body.ResourceID },
      { name: 'StatusID', dataType: sql.Int, value: body.StatusID },
      { name: 'ModifiedBy', dataType: sql.VarChar, value: ModifiedBy },
      { name: 'ModifiedDate', dataType: sql.DateTime, value: ModifiedDate },


    ];
    let CustomQuery = `UPDATE IAP.AA_Resource 
    SET StatusID = @StatusID, 
        ModifiedDate = @ModifiedDate,
        ModifiedBy = @ModifiedBy
    WHERE ResourceID = @ResourceID`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    if (result.rowsAffected[0] > 0) {
      return result.rowsAffected[0];
    } else {
      throw new console.error('Un expected error, updating newsfeed');
    }


  }

  public async deleteResource(req: any, res: any, next: any): Promise<boolean> {
    let provider = new SQLDBProvider();
    let id = req.params.id;
    let inputParameters = [{ name: 'ResourceID', dataType: sql.Int, value: id }];
    let CustomQuery = `DELETE FROM IAP.AA_Resource WHERE ResourceID = @ResourceID`;
    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    if (result.rowsAffected > 0) {
      return result.rowsAffected;
    }
  }

  public async saveResources(resources: Resources, userName:string): Promise<any> {
    let dbResources: Resources = new Resources();

    await this.saveResourcesQuery(resources, userName).then(result => {
      dbResources = result;
    });

    return dbResources;
  }

  public async saveResourcesQuery(resources: Resources, userName:string): Promise<any> {

    console.log(resources);
    let provider = new SQLDBProvider();
    let rowsAffected: any = null;
    let statement: string = '';
    let inputParameters: any[] = [];

    if (resources.ResourceID > 0) {

      if (resources.isDeleted) {
        resources.fileName = '';
      }

      statement = `UPDATE IAP.AA_Resource SET StatusID=@statusID, Priority=@priority, 
      DisplayName=@displayName,FileName=@FileName, SourceID=@sourceID, ModifiedDate=@ModifiedDate, 
      ModifiedBy=@ModifiedBy,Description=@description, Link=@link WHERE ResourceID = @id;SELECT @id as id`;
      inputParameters.push({ name: 'id', dataType: sql.Int, value: resources.ResourceID });
    }
    else {

      statement = `INSERT INTO IAP.AA_Resource 
      (StatusID, Priority, DisplayName, FileName, SourceID, PublishedDate, ModifiedDate, ModifiedBy, 
      Description, Link, IsDeleted, IsVisible, IsPublished, CreatedDate, CreatedBy)
      values( @StatusID, @Priority, @DisplayName, @FileName, @SourceID, null, @ModifiedDate,@ModifiedBy,
      @Description, @Link,null,null,null,@ModifiedDate, @CreatedBy);SELECT @@IDENTITY as id`;

      inputParameters.push({ name: 'createdBy', dataType: sql.VarChar, value: userName });
    }

    let currentDate = new Date();
    inputParameters.push({ name: 'statusID', dataType: sql.Int, value: resources.StatusID });
    inputParameters.push({ name: 'priority', dataType: sql.Int, value: resources.Priority });
    inputParameters.push({ name: 'displayName', dataType: sql.VarChar, value: resources.DisplayName });
    inputParameters.push({ name: 'fileName', dataType: sql.VarChar, value: resources.fileName });
    inputParameters.push({ name: 'sourceID', dataType: sql.Int, value: resources.SourceID });
    inputParameters.push({ name: 'modifiedDate', dataType: sql.DateTime, value: currentDate });
    inputParameters.push({ name: 'modifiedBy', dataType: sql.VarChar, value: userName });
    inputParameters.push({ name: 'description', dataType: sql.VarChar, value: resources.Description });
    inputParameters.push({ name: 'Link', dataType: sql.VarChar, value: resources.link });

    await provider
      .executeQuery(statement, inputParameters)
      .then(result => {
        rowsAffected = result.recordset[0].id;
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });
    return rowsAffected;
  }

  public async getNumberOfRecordsForAFile(fileName: string): Promise<any> {
    let provider = new SQLDBProvider();
    let rowsCount: any = null;

    let inputParameters = [{ name: 'fileName', dataType: sql.VarChar, value: fileName }];

    await provider
      .executeQuery('SELECT COUNT(*) as rowsCount FROM IAP.AA_Resource Where FileName = @fileName', inputParameters)
      .then(results => {
        if (results) {
          rowsCount = results.recordset[0].rowsCount;
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return rowsCount;
  }
  public async getNumberOfRecordsForAFileWithID(fileName: string,ResourceID:number): Promise<any> {
    let provider = new SQLDBProvider();
    let rowsCount: any = null;

    let inputParameters = [
      { name: 'fileName', dataType: sql.VarChar, value: fileName },
      { name: 'ResourceID', dataType: sql.Int, value: ResourceID }];
   
    let CustomQuery = `SELECT COUNT(*) as rowsCount FROM IAP.AA_Resource Where FileName = @fileName AND ResourceID = @ResourceID`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          rowsCount = results.recordset[0].rowsCount;
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return rowsCount;
  }
  public async getOldFileName(ResourceID:number): Promise<any> {
    try{
      let provider = new SQLDBProvider();
      let fileName: any = null;
  
      let inputParameters = [
        { name: 'ResourceID', dataType: sql.Int, value: ResourceID }];
     
      let CustomQuery = `SELECT FileName FROM IAP.AA_Resource Where ResourceID = @ResourceID`;
      await provider
        .executeQuery(CustomQuery, inputParameters)
        .then(results => {
          if (results) {
            fileName = results.recordset[0].FileName;
          }
        })
        .catch(err => {
          return LogErrors.logErrors(err);
        });
  
      return fileName;
    }catch(err){
      console.log(err);
    }
  }
}
