import { DataFormatter } from '../providers/dataFormatter/dbFormatData';

// This is the model's class.

// The model's class responsabilities are the following:

//  -   It models the business that is behind the application.
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.

export class OfficeTasks {
  public OfficeTaskID: number = 0;
  public TaskName: string = '';
  public Duration:string = '';
  public StartDate: string = '';
  public EndDate: string = '';
  public Stage: string = '';
  public Percentage:number = 0;
  public Status:number = 0;
  public Description:string = '';


  constructor() {}

  public static MapDBToObject(row: any): OfficeTasks {
    let dataModel: OfficeTasks = new OfficeTasks();

    dataModel.OfficeTaskID = row.OfficeTaskID;
    dataModel.TaskName = row.TaskName;
    dataModel.Duration = row.Duration;
    dataModel.StartDate = row.StartDate;
    dataModel.EndDate = row.EndDate;
    dataModel.Stage = row.Stage;
    dataModel.Percentage = row.Percentage;
    dataModel.Status = row.Status;
    dataModel.Description = row.Description;
 
    //announcement.ModifiedDate = DataFormatter.DateToString(row.ModifiedDate);

    return dataModel;
  }

  public static MapDBToArray(results: any): OfficeTasks[] {
    let modelToArray: OfficeTasks[] = [];

    results.recordset.forEach(function(recordset) {
      let theClass = OfficeTasks.MapDBToObject(recordset);
      modelToArray.push(theClass);
    });

    return modelToArray;
  }

  public static MapObjectToArray(results: any): OfficeTasks[] {
    let modelToArray: OfficeTasks[] = [];

    results.forEach(function(recordset) {
      let theClass = OfficeTasks.MapDBToObject(recordset);
      modelToArray.push(theClass);
    });

    return modelToArray;
  }

}
