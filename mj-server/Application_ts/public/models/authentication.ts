// This is the model's class.

// The model's class responsabilities are the following:

//  -   It models the business that is behind the application.
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.

export class Authentication {
  
  public Email: string;
  public Role:string;

  constructor() {
    this.Email = "";
    this.Role = "";
  }

 
  public static MapDBToObject(row: any): Authentication {
    let authentication: Authentication = new Authentication();
    authentication.Email = row.IWA_EMAIL;
    authentication.Role = row.IWA_ACCESS_TYPE;

    return authentication;
  }
}
