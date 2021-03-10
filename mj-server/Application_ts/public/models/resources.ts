import * as sql from 'mssql';

import { DataFormatter } from '../providers/dataFormatter/dbFormatData';

// This is the model's class.

// The model's class responsabilities are the following:

//  -   It models the business that is behind the application.
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.

export class Resources {
  
  public ResourceID: number;
  public StatusID: number;
  public SourceID: number;
  public DisplayName: string;
  public Description:string;
  public Priority: number ;
  public ModifiedDate:string;
  public ModifiedBy:string;
  public Name:string;
  public fileName:string;
  public link: string;
  public isDeleted: boolean;
  public isVisible: boolean;

  constructor() {
    this.ResourceID = 0;
    this.StatusID = 1;
    this.SourceID = 0;
    this.DisplayName= "";
    this.Description = "";
    this.Priority =0;
    this.ModifiedDate = "";
    this.ModifiedBy = "";
    this.Name="";
    this.fileName = "";
    this.link = '';
    this.isDeleted = false;
    this.isVisible = false;
  }

  public SetDefaults()
  {
    if(this.StatusID == null || this.StatusID.toString() == "undefined" || this.StatusID.toString() == "")
    {
      this.StatusID = 1; // draft value is 1
    }

    // if(this.link == null)
    // {
    //   this.link = "";
    // }
  }

  public SetIsDeleted(hasBeenDeleted: boolean)
  {
    this.isDeleted = hasBeenDeleted;
  }

 
  public static MapDBToObject(row: any): Resources {
    let resources: Resources = new Resources();
    resources.ResourceID = row.ResourceID;
    resources.StatusID = row.StatusID;
    resources.DisplayName = row.DisplayName;
    resources.Description = row.Description;
    resources.Priority = row.Priority;
    resources.ModifiedDate = DataFormatter.DateToString(row.ModifiedDate);
    resources.ModifiedBy = row.ModifiedBy;
    resources.link = row.Link;
    resources.Name = row.Name;
    resources.fileName = row.FileName;
    resources.SourceID = row.SourceID;

    return resources;
  }

  public static MapDBToArray(results: any): Resources[] {
    let resourcesArray: Resources[] = [];

    results.recordset.forEach(function(recordset) {
      let resources = Resources.MapDBToObject(recordset);
      resourcesArray.push(resources);
    });

    return resourcesArray;
  }

  public static MapObjectToArray(results: any): Resources[] {
    let resourcesArray: Resources[] = [];

    results.forEach(function(recordset) {
      let resources = Resources.MapDBToObject(recordset);
      resourcesArray.push(resources);
    });

    return resourcesArray;
  }

  public GetDBParameters(): any[] {
    let inputParameters = [];

    if (this.ResourceID > 0) {
      inputParameters.push({ name: 'id', dataType: sql.Int, value: this.ResourceID });
    }

    inputParameters.push({ name: 'displayName', dataType: sql.NVarChar, value: this.DisplayName });
    inputParameters.push({ name: 'fileName', dataType: sql.NVarChar, value: this.fileName });
    inputParameters.push({ name: 'Link', dataType: sql.NVarChar, value: this.link });
    inputParameters.push({ name: 'description', dataType: sql.NVarChar, value: this.Description });
    inputParameters.push({ name: 'lastUpdatedDate', dataType: sql.DateTime, value: DataFormatter.StringToDate(this.ModifiedDate) });
    //inputParameters.push({ name: 'isVisible', dataType: sql.Bit, value: DataFormatter.BooleanToBit(this.isVisible) });

    return inputParameters;
  }
}
