
import { LogErrors } from '../../../common/logErrors.controller';
import { IAuthentication } from '../../../interfaces/iAuthenticationController';
import { IAuthenticationService } from '../../../interfaces/iAuthenticationService';
import { AuthenticationService } from '../../../services/authenticationService';


// The controller class is the entry point for the API calls.
// The controller's responsabilities are the following:

//      -   to implement the API calls.
//      -   to initiate the service class.
//      -   to call into the appropriate methods of the service class.
//      -   to return the service's methods results to the client.

// The controller is agnostic of the logic the service implements.
// The APIs are called via the following route: http://localhost:5200/Resources/

class AuthenticationController implements IAuthentication {
  private service: IAuthenticationService;

  constructor(router) {
    this.service = new AuthenticationService();

    router.get('/verifyAccess', this.verifyAccess.bind(this));
  }

  verifyAccess(req: any, res: any, next: any): Promise<any> {
    return this.service
   .verifyAccess(req, res, next)
   .then(results =>{
     res.json(results)
   })
   .catch(err => {
    console.log(err)
   });
}


}

module.exports = AuthenticationController;
