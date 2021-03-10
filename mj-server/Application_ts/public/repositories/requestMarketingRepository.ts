import * as sql from 'mssql';
import { LogErrors } from '../common/logErrors.controller';

import { IRequestMarketing } from '../interfaces/iRequestMarketingController';
import { IAnnouncementRepository } from '../interfaces/iAnnouncementRepository';
import { RequestMarketing } from '../models/requestMarketing';
import { DataFormatter } from '../providers/dataFormatter/dbFormatData';
import { SQLDBProvider } from '../providers/dbProvider/sqlDBProvider';

// The repository class implements the calls to the database.
// The repository class's responsabilities are the following:

//  -   make use of the SQLDBProvider class to call into the database.
//  -   execute calls to the database via methods that uses stored procedures or
//  -   via methods that uses inline queries.

//  The repository class methods catch the database errors and logged the errors into the database (table dbo.Errors)

export class RequestMarketingRepository implements IRequestMarketing {
  constructor() {}

  public async getAllRequestMarketing(req:any,res:any,next:any): Promise<any> {


    let requestMarketingArray: RequestMarketing[] = [];
    let provider = new SQLDBProvider();
    let inputParameters: any[] = [];
    let CustomQuery = `SELECT nf.*, cntr.Name as Country
    FROM IAP.AA_RequestForMaterial  AS nf 
    LEFT JOIN IAP.AA_Lookup_Country AS cntr ON nf.CountryID = cntr.ID

    ORDER BY nf.RequestMarketingID DESC `;
    await provider
      .executeQuery(CustomQuery)
      .then(results => {
        if (results) {
            requestMarketingArray = RequestMarketing.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return requestMarketingArray;
  }

  public async getRequestMarektingByID(req:any,res:any,next:any): Promise<any> {
    let provider = new SQLDBProvider();
    let announce: RequestMarketing = new RequestMarketing();
    let id = req.params.id;

    let inputParameters = [{ name: 'id', dataType: sql.Int, value: id }];
    let CustomQuery = `SELECT nf.*, prv.Name as Province, cntr.Name as Country
    FROM IAP.AA_RequestForMaterial  AS nf 
    LEFT JOIN IAP.AA_Lookup_Province AS prv ON nf.ProvinceID = prv.ID
    LEFT JOIN IAP.AA_Lookup_Country AS cntr ON nf.CountryID = cntr.ID

    WHERE nf.RequestMarketingID = @id;`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          announce = RequestMarketing.MapDBToObject(results.recordset[0]);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return [announce];
  }

  public async insertRequestMarketing(req:any,res:any){
    //let returnValue: boolean = true;
    let body = req.body;
    console.log(body);
    let CreatedBy = req.authInfo.name;
    let ModifiedBy = req.authInfo.name;
    let CreatedDate = new Date();
    let ModifiedDate = new Date();
    let PublishedFrom = new Date(DataFormatter.formatDate(body.PublishedFrom));
    let PublishedTo = new Date(DataFormatter.formatDate(body.PublishedTo));

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'Priority', dataType: sql.Int, value: body.Priority },
      { name: 'Title', dataType: sql.VarChar, value: body.Title },
      { name: 'StatusID', dataType: sql.Int, value: 1 },
      { name: 'PublishedFrom', dataType: sql.DateTime, value: PublishedFrom },
      { name: 'PublishedTo', dataType: sql.DateTime, value: PublishedTo },
      { name: 'AnnouncementContent', dataType: sql.VarChar, value: body.AnnouncementContent },
      { name: 'CreatedDate', dataType: sql.DateTime, value: CreatedDate },
      { name: 'ModifiedDate', dataType: sql.DateTime, value: ModifiedDate },
      { name: 'CreatedBy', dataType: sql.VarChar, value: CreatedBy },
      { name: 'ModifiedBy', dataType: sql.VarChar, value: ModifiedBy }

    ];
    let CustomQuery = `INSERT INTO IAP.AA_Announcement 
    (Priority, PublishedFrom, PublishedTo, Title, AnnouncementContent, StatusID, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy)
     VALUES 
    (@Priority, @PublishedFrom, @PublishedTo, @Title, @AnnouncementContent, @StatusID, @CreatedDate, @ModifiedDate, @CreatedBy, @ModifiedBy); SELECT @@IDENTITY AS id`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
       LogErrors.logErrors(err);
    });
    if(result.recordset[0].id)
    {
      return result.recordset[0].id;
    }else{
        throw new console.error('error inserting newsfeed');
    }

  }

  public async updateRequestMarketing(req:any,res:any){
    //let returnValue: boolean = true;
    let body = req.body;
    let ModifiedBy = req.authInfo.name;
    let ModifiedDate = new Date();
    let PublishedFrom = new Date(DataFormatter.formatDate(body.PublishedFrom));
    let PublishedTo = new Date(DataFormatter.formatDate(body.PublishedTo));

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'AnnouncementID', dataType: sql.VarChar, value: body.AnnouncementID },
      { name: 'Priority', dataType: sql.Int, value: body.Priority },
      { name: 'Title', dataType: sql.VarChar, value: body.Title },
      { name: 'StatusID', dataType: sql.Int, value: 1 },
      { name: 'PublishedFrom', dataType: sql.DateTime, value: PublishedFrom },
      { name: 'PublishedTo', dataType: sql.DateTime, value: PublishedTo },
      { name: 'AnnouncementContent', dataType: sql.VarChar, value: body.AnnouncementContent },
      { name: 'ModifiedDate', dataType: sql.DateTime, value: ModifiedDate },
      { name: 'ModifiedBy', dataType: sql.VarChar, value: ModifiedBy }

  ];
    let CustomQuery = `UPDATE IAP.AA_Announcement 
    SET Priority = @Priority, 
        PublishedFrom = @PublishedFrom, 
        PublishedTo = @PublishedTo, 
        Title = @Title, 
        AnnouncementContent = @AnnouncementContent, 
        StatusID = @StatusID,
        ModifiedDate = @ModifiedDate,
        ModifiedBy = @ModifiedBy
     WHERE AnnouncementID = @AnnouncementID`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    if(result.rowsAffected[0]>0){
       return result.rowsAffected[0];
    }else{
      throw new console.error('Un expected error, updating newsfeed');
    }
    
  }


  public async deleteRequestMarketing(req:any,res:any,next:any): Promise<boolean> {
    let provider = new SQLDBProvider();
    let id = req.params.id;
    let inputParameters = [{ name: 'AnnouncementID', dataType: sql.Int, value: id }];
    let CustomQuery = `DELETE FROM IAP.AA_Announcement WHERE AnnouncementID = @AnnouncementID`;
    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    console.log(result.rowsAffected);
    if(result.rowsAffected>0){
      return result.rowsAffected;
    }
  }


}
