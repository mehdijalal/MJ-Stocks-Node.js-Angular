import * as sql from 'mssql';
import { SQLDBProvider } from '../providers/dbProvider/sqlDBProvider';
import { LogErrors } from '../common/logErrors.controller';
import { IAuthenticationRepository } from '../interfaces/iAuthenticationRepository';
import { Authentication } from '../models/authentication';


// The repository class implements the calls to the database.
// The repository class's responsabilities are the following:

//  -   make use of the SQLDBProvider class to call into the database.
//  -   execute calls to the database via methods that uses stored procedures or
//  -   via methods that uses inline queries.

//  The repository class methods catch the database errors and logged the errors into the database (table dbo.Errors)

export class AuthenticationRepository implements IAuthenticationRepository {
  constructor() { }


  public async verifyAccess(req: any, res: any, next: any): Promise<any> {


    let provider = new SQLDBProvider();
    let authentication: Authentication = new Authentication();
    let email = req.authInfo.email;

    let inputParameters = [{ name: 'IWA_EMAIL', dataType: sql.VarChar, value: email }];
    let CustomQuery = `SELECT IWA_EMAIL, IWA_ACCESS_TYPE
    FROM IAP.IWA_Admin_Access    
    WHERE IWA_EMAIL = @IWA_EMAIL;`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results.recordset.length > 0) {
          authentication = Authentication.MapDBToObject(results.recordset[0]);
        }
        else{
          authentication.Email = 'NOACCESS';
          authentication.Role = 'NOACCESS';
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return authentication;
  }

  
}
