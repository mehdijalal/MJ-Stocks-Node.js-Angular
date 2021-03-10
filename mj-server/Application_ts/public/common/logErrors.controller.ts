import * as sql from 'mssql';

import { SQLDBProvider } from '../providers/dbProvider/sqlDBProvider';

// This class static method is used to log the application's errors into the database.

export class LogErrors {
  constructor() { }

  public static logErrors(err) 
  {
    if ( process.env.LOGERRORINDB == "true") {
      this.LoginDB(err);
    }
    
    if (process.env.LOGERRORINFILE == "true") {
      console.log(err);
    }         
  }

  public static LoginDB(err: any): Promise<any> 
  {
    let errStack: string = "";
    let errCode: string = "";
    let loggedMessage: string = "";

    let currentDate = new Date();

    if (err.stack) {
      errStack = err.stack;
    }

    if (err.errMessage) {
      loggedMessage = err.errMessage;
    }
    else {
      if (err.message) {
        loggedMessage = err.message
        errCode = "Blob Error"
      }
    }

    if (err.errCode) {
      errCode = err.errCode;
    }

    let provider = new SQLDBProvider();

    let CustomQuery = `INSERT INTO ErrorsLog values (@errorMessage, @errorStack, @date, @user, @errorCode);`;

    let inputParameters = [
      { name: "errorMessage", dataType: sql.NVarChar, value: loggedMessage },
      { name: "errorStack", dataType: sql.NVarChar, value: errStack },
      { name: "date", dataType: sql.DateTime, value: currentDate },
      { name: "user", dataType: sql.NVarChar, value: 'Admin Server App Service' },
      { name: "errorCode", dataType: sql.NVarChar, value: errCode },
    ];

    provider.executeQuery(CustomQuery, inputParameters);

    return new Promise<any>((resolve, reject) => {
      resolve("The server encounters an error.");
    });
  }

  public static logMessage(message: any): Promise<any> {
    let errStack: string = "";
    let errCode: string = "";
    
    let loggedMessage: string = message? message: "";

    let currentDate = new Date();

    let provider = new SQLDBProvider();

    let CustomQuery = `INSERT INTO ErrorsLog values (@errorMessage, @errorStack, @date, @user, @errorCode);`;

    let inputParameters = [
      { name: "errorMessage", dataType: sql.NVarChar, value: loggedMessage },
      { name: "errorStack", dataType: sql.NVarChar, value: errStack },
      { name: "date", dataType: sql.Date, value: currentDate },
      { name: "user", dataType: sql.NVarChar, value: '' },
      { name: "errorCode", dataType: sql.NVarChar, value: errCode },
    ];

    provider.executeQuery(CustomQuery, inputParameters);

    return new Promise<any>((resolve, reject) => {
      resolve("The server encounters an error.");
    });
  }

  public static cleanupErrors()
  {   
    let provider = new SQLDBProvider();

    let CustomQuery = `DELETE ErrorsLog WHERE ModifiedDate < DATEADD(day, @noOfDays, GetDate())`;
    
    let currentDate = new Date();

    let inputParameters = [{ name: "noOfDays", dataType: sql.Int, value:  process.env.LOGERRORDAYS}];

    provider.executeQuery(CustomQuery, inputParameters);
  }
 
}
