import { DataFormatter } from '../providers/dataFormatter/dbFormatData';

// This is the model's class.

// The model's class responsabilities are the following:

//  -   It models the business that is behind the application.
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.

export class TasksModel {
  public TaskID: number = 0;
  public TaskName: string = '';
  public Duration:string = '';
  public StartDate: string = '';
  public StartTimeID: number = 0;
  public StartTime: string = '';
  public EndDate: string = '';
  public EndTimeID: number = 0;
  public Stage: string = '';
  public Percentage:number = 0;
  public Status:number = 0;
  public Description:string = '';
  public CategoryID:number = 0;
  public CategoryName:string = '';
  public RepeatTypeGuidForSeries:string = '';
  public totaltasks:number =0;
 

  constructor() {}

  public static MapDBToObject(row: any): TasksModel {
    let dataModel: TasksModel = new TasksModel();

    dataModel.TaskID = row.TaskID;
    dataModel.TaskName = row.TaskName;
    dataModel.Duration = row.Duration;
    dataModel.StartDate = row.StartDate;
    dataModel.StartTimeID = row.StartTimeID;
    dataModel.EndDate = row.EndDate;
    dataModel.EndTimeID = row.EndTimeID;
    dataModel.Stage = row.Stage;
    dataModel.Percentage = row.Percentage;
    dataModel.Status = row.Status;
    dataModel.Description = row.Description;
    dataModel.CategoryName = row.CategoryName;
    dataModel.CategoryID = row.CategoryID;
    dataModel.totaltasks = row.totaltasks;
    dataModel.StartTime = row.StartTime;
    dataModel.RepeatTypeGuidForSeries = row.RepeatTypeGuidForSeries;
 
    //announcement.ModifiedDate = DataFormatter.DateToString(row.ModifiedDate);

    return dataModel;
  }

  public static MapDBToArray(results: any): TasksModel[] {
    let modelToArray: TasksModel[] = [];

    results.recordset.forEach(function(recordset) {
      let theClass = TasksModel.MapDBToObject(recordset);
      modelToArray.push(theClass);
    });

    return modelToArray;
  }

  public static MapObjectToArray(results: any): TasksModel[] {
    let modelToArray: TasksModel[] = [];

    results.forEach(function(recordset) {
      let theClass = TasksModel.MapDBToObject(recordset);
      modelToArray.push(theClass);
    });

    return modelToArray;
  }

}
