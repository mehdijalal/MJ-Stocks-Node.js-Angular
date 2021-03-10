import * as sql from 'mssql';

import { DataFormatter } from '../providers/dataFormatter/dbFormatData';

// This is the model's class.

// The model's class responsabilities are the following:

//  -   It models the business that is behind the application.
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.

export class Lookup {
  // data members need to be initiated to be mapped by mapping functions below
  public ID: number = 0;
  public Name: string = '';
  public Code: string = '';

  constructor() {}

  public static MapDBToObject(row: any): Lookup {
    let lookup: Lookup = new Lookup();

    lookup.ID = row.ID;
    lookup.Name = row.Name;
    lookup.Code = row.Code;

    return lookup;
  }

  public static MapDBToArray(results: any): Lookup[] {
    let lookupArray: Lookup[] = [];



    results.recordset.forEach(function(recordset) {
      let lookup = Lookup.MapDBToObject(recordset);
      lookupArray.push(lookup);
    });

    return lookupArray;
  }

  public static MapObjectToArray(results: any): Lookup[] {
    let lookupArray: Lookup[] = [];
    results.forEach(function(recordset) {
      let lookup = Lookup.MapDBToObject(recordset);
      lookupArray.push(lookup);
    });

    return lookupArray;
  }

  public GetDBParameters(): any[] {
    let inputParameters = [];

    if (this.ID > 0) {
      inputParameters.push({ name: 'id', dataType: sql.Int, value: this.ID });
    }

    inputParameters.push({ name: 'Name', dataType: sql.NVarChar, value: this.Name });
    inputParameters.push({ name: 'Code', dataType: sql.NVarChar, value: this.Code });
    //inputParameters.push({ name: 'newfeedContent', dataType: sql.NVarChar, value: this.NewsfeedContent });
    //inputParameters.push({ name: 'CreatedBy', dataType: sql.NVarChar, value: this.CreatedBy });
    //inputParameters.push({ name: 'lastUpdatedDate', dataType: sql.DateTime, value: DataFormatter.StringToDate(this.lastUpdatedDate) });
    //inputParameters.push({ name: 'isVisible', dataType: sql.Bit, value: DataFormatter.BooleanToBit(this.isVisible) });

    return inputParameters;
  }
}
