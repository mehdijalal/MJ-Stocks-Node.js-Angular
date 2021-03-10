import * as sql from 'mssql';
import { DataFormatter } from '../providers/dataFormatter/dbFormatData';

// This is the model's class.

// The model's class responsabilities are the following:

//  -   It models the business that is behind the application.
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.

export class Announcement {
  public EmployeeID: number = 0;
  public StatusID: number = 0;
  public LastName:string = '';
  public FirstName: string = '';
  public Position: string = '';
  public Office: string = '';
  public Age: string = '';
  public StartDate: string = '';
  public Name: string;


  constructor() {}

  public static MapDBToObject(row: any): Announcement {
    let announcement: Announcement = new Announcement();

    announcement.EmployeeID = row.EmployeeID;
    announcement.StatusID = row.StatusID;
    announcement.LastName = row.LastName;
    announcement.FirstName = row.FirstName;
    announcement.Position = row.Position;
    announcement.Office = row.Office;
    announcement.Age = row.Age;
    announcement.StartDate = row.StartDate;
    announcement.Name = row.Name;
    //announcement.ModifiedDate = DataFormatter.DateToString(row.ModifiedDate);
    announcement.Name = row.Name;

    return announcement;
  }

  public static MapDBToArray(results: any): Announcement[] {
    let announcementArray: Announcement[] = [];

    results.recordset.forEach(function(recordset) {
      let announcement = Announcement.MapDBToObject(recordset);
      announcementArray.push(announcement);
    });

    return announcementArray;
  }

  public static MapObjectToArray(results: any): Announcement[] {
    let announcementArray: Announcement[] = [];

    results.forEach(function(recordset) {
      let announcement = Announcement.MapDBToObject(recordset);
      announcementArray.push(announcement);
    });

    return announcementArray;
  }

}
