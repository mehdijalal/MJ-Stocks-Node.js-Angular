import * as sql from 'mssql';
import { LogErrors } from '../common/logErrors.controller';
import { INewsFeedRepository } from '../interfaces/iNewsFeedRepository';
import { NewsFeed } from '../models/newsfeed';
import { DataFormatter } from '../providers/dataFormatter/dbFormatData';
import { SQLDBProvider } from '../providers/dbProvider/sqlDBProvider';


// The repository class implements the calls to the database.
// The repository class's responsabilities are the following:

//  -   make use of the SQLDBProvider class to call into the database.
//  -   execute calls to the database via methods that uses stored procedures or
//  -   via methods that uses inline queries.

//  The repository class methods catch the database errors and logged the errors into the database (table dbo.Errors)

export class NewsFeedRepository implements INewsFeedRepository {
  constructor() {}

  public async getAllNewsFeeds(req:any,res:any,next:any): Promise<any> {


    let newFeedsArray: NewsFeed[] = [];
    let provider = new SQLDBProvider();
    let inputParameters: any[] = [];
    let CustomQuery = `SELECT nf.*, st.Name
            FROM IAP.AA_Newsfeed  AS nf 
            LEFT JOIN IAP.AA_Lookup_Status AS st ON nf.StatusID = st.ID
            ORDER BY nf.NewsfeedID DESC `;
    await provider
      .executeQuery(CustomQuery)
      .then(results => {
        if (results) {
          newFeedsArray = NewsFeed.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return newFeedsArray;
  }

  public async getAllPublishedNewsfeed(): Promise<any> {

    let newFeedsArray: NewsFeed[] = [];
    let provider = new SQLDBProvider();
    let inputParameters: any[] = [];
    let CustomQuery = `SELECT nf.*, st.Name
    FROM IAP.AA_Newsfeed  AS nf 
      LEFT JOIN IAP.AA_Lookup_Status AS st ON nf.StatusID = st.ID
      WHERE st.Name='Published' AND nf.PublishedDate <= GETDATE()
    ORDER BY nf.NewsfeedID DESC `;
    await provider
      .executeQuery(CustomQuery)
      .then(results => {
        if (results) {
          newFeedsArray = NewsFeed.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return newFeedsArray;
  }

  public async getNewsFeedById(req:any,res:any,next:any): Promise<any> {
    let provider = new SQLDBProvider();
    let newFeed: NewsFeed = new NewsFeed();
    let id = req.params.id;

    let inputParameters = [{ name: 'id', dataType: sql.Int, value: id }];
    let CustomQuery = `SELECT nf.*, st.Name
    FROM IAP.AA_Newsfeed  AS nf 
    LEFT JOIN IAP.AA_Lookup_Status AS st ON nf.StatusID = st.ID 
    WHERE nf.NewsfeedID = @id;`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          newFeed = NewsFeed.MapDBToObject(results.recordset[0]);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return [newFeed];
  }

  public async insertNewsfeed(req:any,res:any){

    let authInfo = req.authInfo;

    //let returnValue: boolean = true;
    console.log('--------repo called--------nesefeed----');
    let body = req.body;
    let CreatedBy = authInfo.name;
    let ModifiedBy = authInfo.name;
    let CreatedDate = new Date();
    let ModifiedDate = new Date();
    let pubdate = new Date(DataFormatter.formatDate(body.publishdate));

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'Title', dataType: sql.VarChar, value: body.title },
      { name: 'StatusID', dataType: sql.Int, value: 1 },
      { name: 'PublishedDate', dataType: sql.DateTime, value: pubdate },
      { name: 'NewsfeedContent', dataType: sql.VarChar, value: body.newsfeedContentCtrl },
      { name: 'Headline', dataType: sql.VarChar, value: body.headlineCtrl },
      { name: 'CreatedDate', dataType: sql.DateTime, value: CreatedDate },
      { name: 'ModifiedDate', dataType: sql.DateTime, value: ModifiedDate },
      { name: 'CreatedBy', dataType: sql.VarChar, value: CreatedBy },
      { name: 'ModifiedBy', dataType: sql.VarChar, value: ModifiedBy },

    ];
    let CustomQuery = `INSERT INTO IAP.AA_Newsfeed 
    (Title, StatusID, PublishedDate, NewsfeedContent, Headline, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy)
     VALUES 
    (@Title, @StatusID, @PublishedDate, @NewsfeedContent, @Headline, @CreatedDate, @ModifiedDate, @CreatedBy, @ModifiedBy); SELECT @@IDENTITY AS id`;

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

  public async updateNewsfeed(req:any,res:any){
    //let returnValue: boolean = true;
    let body = req.body;
    let CreatedBy = req.authInfo.name;
    let ModifiedBy = req.authInfo.name;
    let CreatedDate = new Date();
    let ModifiedDate = new Date();
    let pubdate = new Date(DataFormatter.formatDate(body.publishdate));

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'NewsfeedID', dataType: sql.VarChar, value: body.NewsfeedID },
      { name: 'Title', dataType: sql.VarChar, value: body.title },
      { name: 'StatusID', dataType: sql.Int, value: body.StatusID },
      { name: 'PublishedDate', dataType: sql.DateTime, value: pubdate },
      { name: 'NewsfeedContent', dataType: sql.VarChar, value: body.newsfeedContentCtrl },
      { name: 'Headline', dataType: sql.VarChar, value: body.headlineCtrl },
      { name: 'CreatedDate', dataType: sql.DateTime, value: CreatedDate },
      { name: 'ModifiedDate', dataType: sql.DateTime, value: ModifiedDate },
      { name: 'CreatedBy', dataType: sql.VarChar, value: CreatedBy },
      { name: 'ModifiedBy', dataType: sql.VarChar, value: ModifiedBy },

  ];
    let CustomQuery = `UPDATE IAP.AA_Newsfeed 
    SET Title = @Title, 
        StatusID = @StatusID, 
        PublishedDate = @PublishedDate, 
        NewsfeedContent = @NewsfeedContent, 
        Headline = @Headline, 
        ModifiedDate = @ModifiedDate,
        ModifiedBy = @ModifiedBy
     WHERE NewsfeedID = @NewsfeedID`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    if(result.rowsAffected[0]>0){
       return result.rowsAffected[0];
    }else{
      throw new console.error('Un expected error, updating newsfeed');
    }
    
  }

  public async publishArchiveNewsfeed(req:any,res:any){
    //let returnValue: boolean = true;
    let body = req.body;
    let ModifiedBy = req.authInfo.name;
    let ModifiedDate = new Date();

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'NewsfeedID', dataType: sql.VarChar, value: body.NewsfeedID },
      { name: 'StatusID', dataType: sql.Int, value: body.StatusID },
      { name: 'ModifiedBy', dataType: sql.VarChar, value: ModifiedBy },

  ];
    let CustomQuery = `UPDATE IAP.AA_Newsfeed 
    SET  
        StatusID = @StatusID, 
        ModifiedBy = @ModifiedBy
     WHERE NewsfeedID = @NewsfeedID`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    if(result.rowsAffected[0]>0){
       return result.rowsAffected[0];
    }else{
      throw new console.error('Un expected error, updating newsfeed');
    }
    

  }

  public async deleteNewsFeed(req:any,res:any,next:any): Promise<boolean> {
    let provider = new SQLDBProvider();
    let id = req.params.id;
    let inputParameters = [{ name: 'NewsfeedID', dataType: sql.Int, value: id }];
    let CustomQuery = `DELETE FROM IAP.AA_Newsfeed WHERE NewsfeedID = @NewsfeedID`;
    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    console.log(result.rowsAffected);
    if(result.rowsAffected>0){
      return result.rowsAffected;
    }
  }

  public async saveNewsFeed(newsFeed: NewsFeed): Promise<NewsFeed> {
    let dbNewsFeed: NewsFeed = new NewsFeed();
    await this.saveNewsFeedQuery(newsFeed).then(result => {
      dbNewsFeed = result;
    });

    return dbNewsFeed;
  }

  public async saveNewsFeedQuery(newsFeed: any): Promise<any> {
    let provider = new SQLDBProvider();
    let rowsAffected: any = null;
    let statement: string = '';
    let inputParameters: any[] = [];

    if (newsFeed.id > 0) {
      statement =
        'Update IAP.AA_NewsFeed set Title=@title, StatusID=@statusID, Headline=@headline, ModifiedDate=@createdDate, NewFeedContent=@newfeedContent Where NewsFeedID = @id';
      inputParameters.push({ name: 'id', dataType: sql.Int, value: newsFeed.id });
    } else {
      //statement = "INSERT INTO IAP.AA_NewsFeed values( @statusID, @title,@createdDate,'','',@headline,@newfeedContent,'')";
      statement = `INSERT INTO IAP.AA_Newsfeed 
      (Title, StatusID, PublishedDate, NewsfeedContent, Headline, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy)
       VALUES 
      (@Title, @StatusID, @PublishedDate, @NewsfeedContent, @Headline, @CreatedDate, @ModifiedDate, @CreatedBy, @ModifiedBy)`;
    }

    inputParameters.push({ name: 'statusID', dataType: sql.NVarChar, value: newsFeed.statusID });
    inputParameters.push({ name: 'title', dataType: sql.NVarChar, value: newsFeed.title });
    inputParameters.push({ name: 'newfeedContent', dataType: sql.NVarChar, value: newsFeed.newfeedContent });
    inputParameters.push({ name: 'headline', dataType: sql.NVarChar, value: newsFeed.headline });
    // inputParameters.push({ name: 'author', dataType: sql.NVarChar, value: newsFeed.author });
    // inputParameters.push({ name: 'lastUpdatedDate', dataType: sql.DateTime, value: DataFormatter.StringToDate(newsFeed.lastUpdatedDate) });
    inputParameters.push({ name: 'createdDate', dataType: sql.DateTime, value: DataFormatter.StringToDate(newsFeed.createdDate) });
    inputParameters.push({ name: 'isPublished', dataType: sql.Bit, value: DataFormatter.BooleanToBit(newsFeed.isPublished) });

    await provider
      .executeQuery(statement, inputParameters)
      .then(result => {
        rowsAffected = result.rowsAffected[0];
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return rowsAffected;
  }
}
