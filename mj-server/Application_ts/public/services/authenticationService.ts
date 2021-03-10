import { IAuthenticationService } from '../interfaces/iAuthenticationService';
import { IAuthenticationRepository } from '../interfaces/iAuthenticationRepository';
import { AuthenticationRepository } from '../repositories/authenticationRepository';
import { Authentication } from '../models/authentication';

// The service class implements the application business logic
// The service's responsabilities are the following:

//  -   to initiate the repository class
//  -   to call into the repository's methods to get and save the data as objects.
//  -   to execute the business logic that applied to the models.

//  The service class can be mocked and the client's functionality can be tested only
//  with the data retrieved from the mock service (JSON data) and therefore decoupled from the database.

// This service's methods called into the repository's methods that uses inline queries to communicate with the database.

export class AuthenticationService implements IAuthenticationService {
  private repo: IAuthenticationRepository;

  
  constructor() {
      this.repo = new AuthenticationRepository();

  }

  //
  async verifyAccess(req: any, res: any, next: any): Promise<any> {

    let authentication: Authentication;
    await this.repo
      .verifyAccess(req, res, next)
      .then(results => (authentication = results))
      .catch(err => {
        next(err);
      });

    return authentication;
  }  
  
}
