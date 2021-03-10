import { TYPES } from 'mssql';

import { LogErrors } from '../common/logErrors.controller';
import { ITasks } from '../interfaces/iTasks';
import { TasksModel } from '../models/tasksModel';
import { DataFormatter } from '../providers/dataFormatter/dbFormatData';
import { SQLDBProvider } from '../providers/dbProvider/sqlDBProvider';
//var moment = require('moment-timezone');
import * as _moment from 'moment-timezone';
import bodyParser = require('body-parser');
// The repository class implements the calls to the database.
// The repository class's responsabilities are the following:

//  -   make use of the SQLDBProvider class to call into the database.
//  -   execute calls to the database via methods that uses stored procedures or
//  -   via methods that uses inline queries.

//  The repository class methods catch the database errors and logged the errors into the database (table dbo.Errors)

export class TasksRepo implements ITasks {
  constructor() { }

  public async getMyGroupedTasksByDueDate(req: any, res: any, next: any): Promise<any> {

    console.log('---geting due today 55------');
    let DueDate = req.params.duedate;
    //console.log(req.params);
    //console.log(DueDate);
    DueDate = new Date(DueDate);
    //console.log(DueDate);
    let modelToArray: TasksModel[] = [];
    let provider = new SQLDBProvider();
    let UserID = 1007;
    let inputParameters = [
      { name: 'UserId', dataType: TYPES.Int, value: UserID },
      { name: 'EndDate', dataType: TYPES.DateTime, value: DueDate }
    ];
    let CustomQuery = `SELECT ts.CategoryID, COUNT(ts.CategoryID) AS totaltasks, ct.Name AS CategoryName
    FROM MJ.Tasks AS ts
    LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
    WHERE ts.Status !=1 AND ts.UserID = @UserID AND CAST(ts.EndDate AS DATE) = CAST(@EndDate AS DATE)
    GROUP BY ts.CategoryID, ct.Name
    ORDER BY ct.Name ASC`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }
  public async getMyGroupedPendingTasksBetweenDates(req: any, res: any, next: any): Promise<any> {

    console.log('---geting grouped between dates------');
    let StartingDate = req.params.startdate;
    let EndDate = req.params.enddate;
    //console.log(req.params);
    //console.log(StartDate);
    StartingDate = new Date(StartingDate);
    EndDate = new Date(EndDate);
    //console.log(StartDate);
    //console.log(EndDate);
    let modelToArray: TasksModel[] = [];
    let provider = new SQLDBProvider();
    let UserID = 1007;
    let inputParameters = [
      { name: 'UserId', dataType: TYPES.Int, value: UserID },
      { name: 'StartingDate', dataType: TYPES.DateTime, value: StartingDate },
      { name: 'EndingDate', dataType: TYPES.DateTime, value: EndDate }
    ];
    let CustomQuery = `SELECT ts.CategoryID, COUNT(ts.CategoryID) AS totaltasks, ct.Name AS CategoryName
    FROM MJ.Tasks AS ts
    LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
    WHERE ts.Status !=1 AND ts.UserID = @UserID AND CAST(ts.EndDate AS DATE) BETWEEN CAST(@StartingDate AS DATE) AND CAST(@EndingDate AS DATE)
    GROUP BY ts.CategoryID, ct.Name
    ORDER BY ct.Name ASC`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }
  public async getAllMyTasksBetweenDates(req: any, res: any, next: any): Promise<any> {

    console.log('---geting all my tasks between dates-----');
    let StartingDate = req.params.startdate;
    let EndDate = req.params.enddate;
    //console.log(req.params);
    //console.log(StartDate);
    StartingDate = new Date(StartingDate);
    EndDate = new Date(EndDate);
    console.log(StartingDate);
    console.log(EndDate);
    let modelToArray: TasksModel[] = [];
    let provider = new SQLDBProvider();
    let UserID = 1007;
    let inputParameters = [
      { name: 'UserId', dataType: TYPES.Int, value: UserID },
      { name: 'StartingDate', dataType: TYPES.DateTime, value: StartingDate },
      { name: 'EndingDate', dataType: TYPES.DateTime, value: EndDate }
    ];
    let CustomQuery = `SELECT ts.EndDate, ts.Status
    FROM MJ.Tasks AS ts
    WHERE ts.UserID = @UserID AND CAST(ts.EndDate AS DATE) BETWEEN CAST(@StartingDate AS DATE) AND CAST(@EndingDate AS DATE)
    `;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        //console.log(results);
        if (results) {
          modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }
  public async getTaskByStatusTypeStartEndDate(req: any, res: any, next: any): Promise<any> {

    console.log('---geting all my tasks by status between dates-----');
    let StatusType = req.params.statustype;
    let StartingDate = req.params.startdate;
    let EndDate = req.params.enddate;
    //console.log(req.params);
    //console.log(StartDate);
    StartingDate = new Date(StartingDate);
    EndDate = new Date(EndDate);
    console.log(StartingDate);
    console.log(EndDate);
    console.log(StatusType);
    let status = 0;
    if (StatusType == 'Completed') {
      status = 1;
    } else if (StatusType == 'Pending') {
      status = 0;
    } else {
      status = 0;
    }

    let modelToArray: TasksModel[] = [];
    let provider = new SQLDBProvider();
    let UserID = 1007;
    let inputParameters = [
      { name: 'UserId', dataType: TYPES.Int, value: UserID },
      { name: 'StartingDate', dataType: TYPES.DateTime, value: StartingDate },
      { name: 'EndingDate', dataType: TYPES.DateTime, value: EndDate },
      { name: 'PostedStatus', dataType: TYPES.Int, value: status }
    ];
    let CustomQuery;
    if (StatusType == 'Completed') {
      CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
        FROM MJ.Tasks AS ts
        LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
        WHERE ts.Status=1 AND ts.UserID = @UserID AND CAST(ts.EndDate AS DATE) BETWEEN CAST(@StartingDate AS DATE) AND CAST(@EndingDate AS DATE)
        `;
    } else if (StatusType == 'Pending') {
      CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
      FROM MJ.Tasks AS ts
      LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
      WHERE ts.Status!=1 AND ts.UserID = @UserID AND CAST(ts.EndDate AS DATE) BETWEEN CAST(GETDATE() AS DATE) AND CAST(@EndingDate AS DATE)
      `;
    } else if (StatusType == 'Overdue') {
      CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
        FROM MJ.Tasks AS ts
        LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
        WHERE ts.Status!=1 AND ts.UserID = @UserID AND CAST(ts.EndDate AS DATE) BETWEEN CAST(@StartingDate AS DATE) AND CAST(GETDATE()-1 AS DATE)
        `;
    }
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        //console.log(results);
        if (results) {
          modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }

  public async getTaskByCategoryIdAndDueDate(req: any, res: any, next: any): Promise<any> {
    let provider = new SQLDBProvider();
    let modelToArray: TasksModel[] = [];
    let categoryID = req.params.categoryId;
    let DueDate = req.params.DueDate;

    let newDuedate = DataFormatter.dateFormate(DueDate);
    //console.log('----here------');
    console.log(newDuedate);
    console.log(categoryID);
    let UserID = 1007;
    let inputParameters = [];
    let CustomQuery: any;
    if (categoryID == 'all') {
      inputParameters = [
        //{ name: 'CategoryID', dataType: TYPES.Int, value: categoryID },
        { name: 'EndDate', dataType: TYPES.DateTime, value: newDuedate },
        { name: 'UserId', dataType: TYPES.Int, value: UserID }
      ];
      CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
      FROM MJ.Tasks  AS ts 
      LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
      WHERE ts.Status!=1 AND ts.UserID = @UserID AND  CAST(ts.EndDate AS DATE) = CAST(@EndDate AS DATE)`;

    } else {
      inputParameters = [
        { name: 'CategoryID', dataType: TYPES.Int, value: categoryID },
        { name: 'EndDate', dataType: TYPES.DateTime, value: newDuedate },
        { name: 'UserId', dataType: TYPES.Int, value: UserID }
      ];
      CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
      FROM MJ.Tasks  AS ts 
      LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
      WHERE ts.Status!=1 AND ts.CategoryID = @CategoryID AND ts.UserID = @UserID AND  CAST(ts.EndDate AS DATE) = CAST(@EndDate AS DATE)`;

    }

    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        //console.log(results);
        if (results) {
          modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }
  public async getTaskByCategoryIdStartEndDate(req: any, res: any, next: any): Promise<any> {
    let provider = new SQLDBProvider();
    let modelToArray: TasksModel[] = [];
    let categoryID = req.params.categoryId;
    let StartingDate = req.params.startdate;
    let EndDate = req.params.enddate;

    StartingDate = new Date(StartingDate);
    EndDate = new Date(EndDate);
    console.log('----here with start date end date repos------');
    console.log(categoryID);
    console.log(StartingDate);
    console.log(EndDate);
    let UserID = 1007;
    let inputParameters = [];
    let CustomQuery: any;
    if (categoryID == 'all') {
      console.log('----all is called in start end date-----');
      inputParameters = [
        //{ name: 'CategoryID', dataType: TYPES.Int, value: categoryID },
        { name: 'StartingDate', dataType: TYPES.DateTime, value: StartingDate },
        { name: 'EndDate', dataType: TYPES.DateTime, value: EndDate },
        { name: 'UserId', dataType: TYPES.Int, value: UserID }
      ];
      CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
      FROM MJ.Tasks  AS ts 
      LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
      WHERE ts.Status!=1 AND ts.UserID = @UserID AND  CAST(ts.EndDate AS DATE) BETWEEN CAST(@StartingDate AS DATE) AND CAST(@EndDate AS DATE)`;

    } else {
      inputParameters = [
        { name: 'CategoryID', dataType: TYPES.Int, value: categoryID },
        { name: 'StartingDate', dataType: TYPES.DateTime, value: StartingDate },
        { name: 'EndDate', dataType: TYPES.DateTime, value: EndDate },
        { name: 'UserId', dataType: TYPES.Int, value: UserID }
      ];
      CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
      FROM MJ.Tasks  AS ts 
      LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
      WHERE ts.Status!=1 AND ts.CategoryID = @CategoryID AND ts.UserID = @UserID AND  CAST(ts.EndDate AS DATE) BETWEEN CAST(@StartingDate AS DATE) AND CAST(@EndDate AS DATE)`;

    }

    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        //console.log(results);
        if (results) {
          modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }

  public async getAllTasks(req: any, res: any, next: any): Promise<any> {

    let modelToArray: TasksModel[] = [];
    let provider = new SQLDBProvider();
    let UserID = 1007;
    let inputParameters = [
      { name: 'UserId', dataType: TYPES.Int, value: UserID }
    ];
    let CustomQuery = `SELECT ts.*, ct.Name AS CategoryName, start_time.Name AS StartTime
    FROM MJ.Tasks AS ts
    LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
    LEFT JOIN MJ.Lookup_Time AS start_time ON ts.StartTimeID = start_time.ID
    WHERE ts.UserID = @UserID
    ORDER BY ts.TaskID DESC`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }
  public async getAllMyPendingTasks(req: any, res: any, next: any): Promise<any> {

    let modelToArray: TasksModel[] = [];
    let provider = new SQLDBProvider();
    let UserID = 1007;
    let inputParameters = [
      { name: 'UserId', dataType: TYPES.Int, value: UserID }
    ];
    let CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
    FROM MJ.Tasks AS ts
    LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
    WHERE ts.UserID = @UserID AND ts.Status!=1
    ORDER BY ts.TaskID DESC`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }

  public async getCurrentTasks(req: any, res: any, next: any): Promise<any> { }
  public async getCompletedTasks(req: any, res: any, next: any): Promise<any> { }


  public async getTaskById(req: any, res: any, next: any): Promise<any> {
    let provider = new SQLDBProvider();
    let modelData: TasksModel = new TasksModel();
    let id = req.params.id;
    let UserID = 1007;
    let inputParameters = [
      { name: 'id', dataType: TYPES.Int, value: id },
      { name: 'UserId', dataType: TYPES.Int, value: UserID }
    ];
    let CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
    FROM MJ.Tasks  AS ts 
    LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
    WHERE ts.TaskID = @id AND ts.UserID = @UserID`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          modelData = TasksModel.MapDBToObject(results.recordset[0]);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return [modelData];
  }

  public async viewTasks(req: any, res: any, next: any): Promise<any> {
    let provider = new SQLDBProvider();
    let modelData: TasksModel = new TasksModel();
    let id = req.params.id;

    let inputParameters = [{ name: 'id', dataType: TYPES.Int, value: id }];
    let CustomQuery = `SELECT nf.*, st.Name
    FROM IAP.AA_Announcement  AS nf 
    LEFT JOIN IAP.AA_Lookup_Status AS st ON nf.StatusID = st.ID
    WHERE nf.AnnouncementID = @id;`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
          modelData = TasksModel.MapDBToObject(results.recordset[0]);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return [modelData];
  }

  public async insertTasks(req: any, res: any) {
    console.log('-----inserting--------');
    //let returnValue: boolean = true;
    let body = req.body;
    console.log(body);
    //let CreatedBy = req.authInfo.name;
    //let ModifiedBy = req.authInfo.name;
    let UserID = 1007;
    let CreatedBy = 'Mehdi Jalal';
    let ModifiedBy = 'Mehdi Jalal';
    let CreatedDate = new Date();
    let ModifiedDate = new Date();

    let provider = new SQLDBProvider();
    let inputParameters = [];

    let finalResult = [];
    //let StartDate = new Date(DataFormatter.formatDate(body.StartDate));
    //let EndDate = new Date(DataFormatter.formatDate(body.EndDate));

    console.log(body.StartDate);
    console.log(body.EndDate);
    console.log('------');
    let StartDate = new Date(body.StartDate);
    let EndDate = new Date(body.EndDate);

    console.log(StartDate);
    console.log(EndDate);

    console.log(body.RepeatTypeID);
    let repeatType = body.RepeatTypeID;
    let RandomNumberForSequence = this.createUniqueIds();


    if (repeatType == 1) {
      let diff = Math.abs(StartDate.getTime() - EndDate.getTime());
      let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      //console.log('-----.....-----');
      //console.log(diffDays);

      //console.log('--------random----');
      //console.log(RandomNumberForSequence);
      //console.log('-----end random---');
      for (let i = 0; i <= diffDays; i++) {
        //console.log(i);

        let newStartDate = new Date(StartDate);
        newStartDate.setDate(newStartDate.getDate() + i);

        let newEndDate = new Date(StartDate);
        newEndDate.setDate(newEndDate.getDate() + i);
        console.log('------Newss----');
        console.log(newStartDate);
        console.log(newEndDate);
        console.log('-------end news-----');



        inputParameters = [
          { name: 'TaskName', dataType: TYPES.VarChar, value: body.TaskName },
          { name: 'CategoryID', dataType: TYPES.VarChar, value: body.CategoryID },
          { name: 'StartDate', dataType: TYPES.DateTime, value: newStartDate },
          { name: 'EndDate', dataType: TYPES.DateTime, value: newEndDate },
          { name: 'Description', dataType: TYPES.VarChar, value: body.Description },
          { name: 'CreatedDate', dataType: TYPES.DateTime, value: CreatedDate },
          { name: 'ModifiedDate', dataType: TYPES.DateTime, value: ModifiedDate },
          { name: 'CreatedBy', dataType: TYPES.VarChar, value: CreatedBy },
          { name: 'ModifiedBy', dataType: TYPES.VarChar, value: ModifiedBy },
          { name: 'StartTimeID', dataType: TYPES.Int, value: body.StartTimeID },
          { name: 'EndTimeID', dataType: TYPES.Int, value: body.EndTimeID },
          { name: 'UserID', dataType: TYPES.VarChar, value: UserID },
          { name: 'RepeatTypeID', dataType: TYPES.Int, value: body.RepeatTypeID },
          { name: 'RepeatTypeGuidForSeries', dataType: TYPES.VarChar, value: RandomNumberForSequence }
        ];
        let CustomQuery = `INSERT INTO MJ.Tasks
        (TaskName, CategoryID, StartDate, EndDate, Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, StartTimeID, EndTimeID, RepeatTypeID, RepeatTypeGuidForSeries, UserID)
        VALUES 
        (@TaskName, @CategoryID, @StartDate, @EndDate, @Description, @CreatedDate, @ModifiedDate, @CreatedBy, @ModifiedBy, @StartTimeID, @EndTimeID, @RepeatTypeID, @RepeatTypeGuidForSeries, @UserID); SELECT @@IDENTITY AS id`;

        const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
          console.log(result);
          LogErrors.logErrors(err);
        });

        if (result.recordset[0].id) {
          //return result.recordset[0].id;
          finalResult.push(result.recordset[0].id);
        } else {
          throw new console.error('error inserting newsfeed');
        }
      }
      console.log(finalResult);
      if (finalResult.length > 0) {
        return 1;
      } else {
        return 0;
      }
    } else if (repeatType == 2) {

      //var tz = _moment.tz.guess();
      //console.log(tz);
      //console.log('-----.....-----');
      //console.log(StartDate);
      //console.log(EndDate);

      let object = this.getCorrectWeekDays(StartDate, EndDate);
      //console.log(object);
      //console.log('---******------');

      if (object.length > 0) {
        await Promise.all(object.map(async item => {
          //console.log(item);

          let newStartDate = new Date(item);
          //console.log(newStartDate);

          inputParameters = [
            { name: 'TaskName', dataType: TYPES.VarChar, value: body.TaskName },
            { name: 'CategoryID', dataType: TYPES.VarChar, value: body.CategoryID },

            { name: 'Description', dataType: TYPES.VarChar, value: body.Description },
            { name: 'CreatedDate', dataType: TYPES.DateTime, value: CreatedDate },
            { name: 'ModifiedDate', dataType: TYPES.DateTime, value: ModifiedDate },
            { name: 'CreatedBy', dataType: TYPES.VarChar, value: CreatedBy },
            { name: 'ModifiedBy', dataType: TYPES.VarChar, value: ModifiedBy },
            { name: 'StartTimeID', dataType: TYPES.Int, value: body.StartTimeID },
            { name: 'EndTimeID', dataType: TYPES.Int, value: body.EndTimeID },
            { name: 'UserID', dataType: TYPES.VarChar, value: UserID },
            { name: 'RepeatTypeGuidForSeries', dataType: TYPES.VarChar, value: RandomNumberForSequence },
            { name: 'RepeatTypeID', dataType: TYPES.Int, value: body.RepeatTypeID },
            { name: 'StartDate', dataType: TYPES.DateTime, value: newStartDate },
            { name: 'EndDate', dataType: TYPES.DateTime, value: newStartDate },
          ];
          let CustomQuery = `INSERT INTO MJ.Tasks
          (TaskName, CategoryID, StartDate, EndDate, Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, StartTimeID, EndTimeID, RepeatTypeID, RepeatTypeGuidForSeries, UserID)
          VALUES 
          (@TaskName, @CategoryID, @StartDate, @EndDate, @Description, @CreatedDate, @ModifiedDate, @CreatedBy, @ModifiedBy, @StartTimeID, @EndTimeID, @RepeatTypeID, @RepeatTypeGuidForSeries, @UserID); SELECT @@IDENTITY AS id`;

          const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
            console.log(result);
            LogErrors.logErrors(err);
          });

          if (result.recordset[0].id) {
            //return result.recordset[0].id;
            finalResult.push(result.recordset[0].id);
          } else {
            throw new console.error('error inserting newsfeed');
          }

        }));
        console.log('-----final----------');
        console.log(finalResult);
        if (finalResult.length > 0) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return "Invalid";
      }
    } else if (repeatType == 3) {
      let selDaysArr = body.SelectedWeekDays;
      console.log(selDaysArr);
      let object = this.getِDaysBasedOnArrayDays(StartDate, EndDate, selDaysArr);
      console.log('---------xxx---xx---');
      console.log(object);
      console.log('---xdd-------');
      if (object.length > 0) {
        await Promise.all(object.map(async item => {
          //console.log(item);

          let newStartDate = new Date(item);
          //console.log(newStartDate);

          inputParameters = [
            { name: 'TaskName', dataType: TYPES.VarChar, value: body.TaskName },
            { name: 'CategoryID', dataType: TYPES.VarChar, value: body.CategoryID },

            { name: 'Description', dataType: TYPES.VarChar, value: body.Description },
            { name: 'CreatedDate', dataType: TYPES.DateTime, value: CreatedDate },
            { name: 'ModifiedDate', dataType: TYPES.DateTime, value: ModifiedDate },
            { name: 'CreatedBy', dataType: TYPES.VarChar, value: CreatedBy },
            { name: 'ModifiedBy', dataType: TYPES.VarChar, value: ModifiedBy },
            { name: 'StartTimeID', dataType: TYPES.Int, value: body.StartTimeID },
            { name: 'EndTimeID', dataType: TYPES.Int, value: body.EndTimeID },
            { name: 'UserID', dataType: TYPES.VarChar, value: UserID },
            { name: 'RepeatTypeGuidForSeries', dataType: TYPES.VarChar, value: RandomNumberForSequence },
            { name: 'RepeatTypeID', dataType: TYPES.Int, value: body.RepeatTypeID },
            { name: 'StartDate', dataType: TYPES.DateTime, value: newStartDate },
            { name: 'EndDate', dataType: TYPES.DateTime, value: newStartDate },
          ];
          let CustomQuery = `INSERT INTO MJ.Tasks
            (TaskName, CategoryID, StartDate, EndDate, Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, StartTimeID, EndTimeID, RepeatTypeID, RepeatTypeGuidForSeries, UserID)
            VALUES 
            (@TaskName, @CategoryID, @StartDate, @EndDate, @Description, @CreatedDate, @ModifiedDate, @CreatedBy, @ModifiedBy, @StartTimeID, @EndTimeID, @RepeatTypeID, @RepeatTypeGuidForSeries, @UserID); SELECT @@IDENTITY AS id`;

          const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
            console.log(result);
            LogErrors.logErrors(err);
          });

          if (result.recordset[0].id) {
            //return result.recordset[0].id;
            finalResult.push(result.recordset[0].id);
          } else {
            throw new console.error('error inserting newsfeed');
          }

        }));

        console.log(finalResult);
        if (finalResult.length > 0) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return "Invalid";
      }

    } else {

      inputParameters = [
        { name: 'TaskName', dataType: TYPES.VarChar, value: body.TaskName },
        { name: 'CategoryID', dataType: TYPES.VarChar, value: body.CategoryID },
        { name: 'Description', dataType: TYPES.VarChar, value: body.Description },
        { name: 'CreatedDate', dataType: TYPES.DateTime, value: CreatedDate },
        { name: 'ModifiedDate', dataType: TYPES.DateTime, value: ModifiedDate },
        { name: 'CreatedBy', dataType: TYPES.VarChar, value: CreatedBy },
        { name: 'ModifiedBy', dataType: TYPES.VarChar, value: ModifiedBy },
        { name: 'StartTimeID', dataType: TYPES.Int, value: body.StartTimeID },
        { name: 'EndTimeID', dataType: TYPES.Int, value: body.EndTimeID },
        { name: 'UserID', dataType: TYPES.VarChar, value: UserID },
        { name: 'RepeatTypeGuidForSeries', dataType: TYPES.VarChar, value: RandomNumberForSequence },
        { name: 'RepeatTypeID', dataType: TYPES.Int, value: 0 },
        { name: 'StartDate', dataType: TYPES.DateTime, value: StartDate },
        { name: 'EndDate', dataType: TYPES.DateTime, value: EndDate }
      ];

      let CustomQuery = `INSERT INTO MJ.Tasks
        (TaskName, CategoryID, StartDate, EndDate, Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, StartTimeID, EndTimeID, RepeatTypeID, RepeatTypeGuidForSeries, UserID)
        VALUES 
        (@TaskName, @CategoryID, @StartDate, @EndDate, @Description, @CreatedDate, @ModifiedDate, @CreatedBy, @ModifiedBy, @StartTimeID, @EndTimeID, @RepeatTypeID, @RepeatTypeGuidForSeries, @UserID); SELECT @@IDENTITY AS id`;

      const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
        console.log(result);
        LogErrors.logErrors(err);
      });

      if (result.recordset[0].id) {
        console.log(result.recordset[0].id);
        return result.recordset[0].id;
      } else {
        throw new console.error('error inserting newsfeed');
      }
    }




  }
  //-------Monday to Friday-----------------//
  private getCorrectWeekDays(StartDate, EndDate) {
    let _weekdays = [0, 1, 2, 3, 4];
    var object = [];
    var currentDate = StartDate;
    //console.log('---------start--------');
    //console.log(currentDate.getDay());
    //console.log('--------end --------------');
    while (currentDate <= EndDate) {
      if (_weekdays.includes(currentDate.getDay())) {
        //console.log('--------ss--s------');
        //console.log(currentDate);
        object.push(currentDate.toISOString().split('T')[0]);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return object;
  }
  //-----returns selected dates based on custom selDays array-----//
  private getِDaysBasedOnArrayDays(StartDate, EndDate, selDaysArr) {
    let _weekdays = selDaysArr.map(Number);
    //console.log(_weekdays);
    var object = [];
    var currentDate = StartDate;
    //console.log('---------start--------');
    //console.log(currentDate.getDay());
    //console.log('--------end --------------');
    while (currentDate <= EndDate) {
      if (_weekdays.includes(currentDate.getDay())) {
        //console.log('--------ss--s------');
        //console.log(currentDate);
        object.push(currentDate.toISOString().split('T')[0]);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return object;
  }

  //----Generate Unique ID-----------//
  private createUniqueIds() {
    return new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
  }

  //----------Get weekdays old-------//
  private getWeekDays(_startDate, _endDate, n) {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var object = [];
    var currentDate = _startDate;
    while (currentDate <= _endDate) {
      if (weekday[currentDate.getDay()] === weekday[n])
        object.push(currentDate + "\n");
      currentDate.setDate(currentDate.getDate() + 1);
    } return object;
  }

  public async updateTasks(req: any, res: any) {
    //let returnValue: boolean = true;
    let body = req.body;
    console.log('-------updating tasks-----');
    console.log(body);
    let UserID = 1007;
    let ModifiedBy = 'Mehdi Jalal';
    let ModifiedDate = new Date();

    let provider = new SQLDBProvider();
    let inputParameters = [];

    let finalResult = [];
    //let StartDate = new Date(DataFormatter.formatDate(body.StartDate));
    //let EndDate = new Date(DataFormatter.formatDate(body.EndDate));

    console.log(body.StartDate);
    console.log(body.EndDate);
    console.log('------');
    let StartDate = new Date(body.StartDate);
    let EndDate = new Date(body.EndDate);

    console.log(StartDate);
    console.log(EndDate);

      inputParameters = [
        { name: 'TaskID', dataType: TYPES.Int, value: body.TaskID },
        { name: 'TaskName', dataType: TYPES.VarChar, value: body.TaskName },
        { name: 'CategoryID', dataType: TYPES.VarChar, value: body.CategoryID },
        { name: 'Description', dataType: TYPES.VarChar, value: body.Description },
        { name: 'ModifiedDate', dataType: TYPES.DateTime, value: ModifiedDate },
        { name: 'ModifiedBy', dataType: TYPES.VarChar, value: ModifiedBy },
        { name: 'StartTimeID', dataType: TYPES.Int, value: body.StartTimeID },
        { name: 'EndTimeID', dataType: TYPES.Int, value: body.EndTimeID },
        { name: 'UserID', dataType: TYPES.VarChar, value: UserID },
        { name: 'StartDate', dataType: TYPES.DateTime, value: StartDate },
        { name: 'EndDate', dataType: TYPES.DateTime, value: EndDate }
      ];
      let CustomQuery = `UPDATE MJ.Tasks
      SET TaskName = @TaskName,
          CategoryID = @CategoryID,
          StartDate = @StartDate,
          StartTimeID = @StartTimeID,
          EndDate = @EndDate, 
          EndTimeID = @EndTimeID,
          Description = @Description, 
          ModifiedDate = @ModifiedDate,
          ModifiedBy = @ModifiedBy,
          UserID = @UserID
      WHERE TaskID = @TaskID`;

      const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
        return LogErrors.logErrors(err);
      });
      if (result.rowsAffected[0] > 0) {
        return result.rowsAffected[0];
      } else {
        throw new console.error('Un expected error, updating newsfeed');
      }
    
  }
  public async updateStatus(req: any, res: any) {
    //let returnValue: boolean = true;
    let body = req.body;
    console.log(body);
    let UserID = 1007;
    let ModifiedBy = 'Mehdi Jalal';

    //let ModifiedBy = req.authInfo.name;
    let ModifiedDate = new Date();

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'TaskID', dataType: TYPES.VarChar, value: body.TaskID },
      { name: 'Status', dataType: TYPES.VarChar, value: body.Status },
      { name: 'ModifiedDate', dataType: TYPES.DateTime, value: ModifiedDate },
      { name: 'ModifiedBy', dataType: TYPES.VarChar, value: ModifiedBy },
      { name: 'UserID', dataType: TYPES.VarChar, value: UserID }



    ];
    let CustomQuery = `UPDATE MJ.Tasks
    SET Status = @Status, 
        ModifiedDate = @ModifiedDate,
        ModifiedBy = @ModifiedBy,
        UserID = @UserID
     WHERE TaskID = @TaskID AND UserID = @UserID`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    if (result.rowsAffected[0] > 0) {
      return result.rowsAffected[0];
    } else {
      throw new console.error('Un expected error, updating newsfeed');
    }

  }


  public async deleteTasks(req: any, res: any, next: any): Promise<boolean> {
    let provider = new SQLDBProvider();
    let id = req.params.id;
    let UserID = 1007;
    let inputParameters = [
      { name: 'TaskID', dataType: TYPES.Int, value: id },
      { name: 'UserID', dataType: TYPES.VarChar, value: UserID }
    ];
    let CustomQuery = `DELETE FROM MJ.Tasks WHERE TaskID = @TaskID AND UserID = @UserID`;
    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    console.log(result.rowsAffected);
    if (result.rowsAffected > 0) {
      return result.rowsAffected;
    }
  }
  public async deleteFutureOccurenceBySeriesID(req: any, res: any, next: any): Promise<boolean> {
    let provider = new SQLDBProvider();
    console.log(req.params);
    let seriesId = req.params.id;
    console.log(seriesId);
    let UserID = 1007;
    let inputParameters = [
      { name: 'RepeatTypeGuidForSeries', dataType: TYPES.VarChar, value: seriesId },
      { name: 'UserID', dataType: TYPES.VarChar, value: UserID }
    ];
    let CustomQuery = `DELETE FROM MJ.Tasks WHERE RepeatTypeGuidForSeries = @RepeatTypeGuidForSeries AND UserID = @UserID`;
    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    console.log(result.rowsAffected);
    if (result.rowsAffected > 0) {
      return result.rowsAffected;
    }
  }

  public async deleteAll(req: any, res: any, next: any): Promise<any> {
    let provider = new SQLDBProvider();
    let body = req.body;
    let UserID = 1007;
    var rfinal: number[] = [];
    await Promise.all(body.map(async items => {
      let inputParameters = [
        { name: 'TaskID', dataType: TYPES.Int, value: items.TaskID },
        { name: 'UserID', dataType: TYPES.VarChar, value: UserID }
      ];
      let CustomQuery = `DELETE FROM MJ.Tasks WHERE TaskID = @TaskID AND UserID = @UserID`;
      const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
        return LogErrors.logErrors(err);
      });
      console.log(result.rowsAffected);
      if (result.rowsAffected > 0) {
        //return result.rowsAffected;
        rfinal.push(result.rowsAffected[0]);
      } else {
        throw new console.error('Un expected error, updating newsfeed');
      }
    }));
    if (rfinal.includes(1)) {
      return 1
    } else {
      console.log('------Error update---------');
      return 0;
    }
  }


}
