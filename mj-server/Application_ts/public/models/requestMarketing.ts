import * as sql from 'mssql';
import { DataFormatter } from '../providers/dataFormatter/dbFormatData';

// This is the model's class.

// The model's class responsabilities are the following:

//  -   It models the business that is behind the application.
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.

export class RequestMarketing {
  public RequestMarketingID: number = 0;
  public ProgramList: number = 0;
  public EnglishLanguageInstitute:number = 0;
  public FirstName: string = '';
  public LastName: string = '';
  public EmailAddress: string = '';
  public AddressLine1: string = '';
  public AddressLine2: string = '';
  public CountryID: string = '';
  public ProvinceID: string = '';
  public City: string = '';
  public PostalCode: string = '';
  public Status: string = '';
  public CreatedBy: string = '';
  public CreatedDate:string = '';
  public ModifiedBy: string = '';
  public ModifiedDate: string = '';
  public Province: string = '';
  public Country: string = '';



  constructor() {}

  public static MapDBToObject(row: any): RequestMarketing {
    let requestMarketing: RequestMarketing = new RequestMarketing();

    requestMarketing.RequestMarketingID = row.RequestMarketingID;
    requestMarketing.ProgramList = row.ProgramList;
    requestMarketing.EnglishLanguageInstitute = row.EnglishLanguageInstitute;
    requestMarketing.FirstName = row.FirstName;
    requestMarketing.LastName = row.LastName;
    requestMarketing.EmailAddress = row.EmailAddress;
    requestMarketing.AddressLine1 = row.AddressLine1;
    requestMarketing.AddressLine2 = row.AddressLine2;
    requestMarketing.CountryID = row.CountryID;
    requestMarketing.ProvinceID = row.ProvinceID;
    requestMarketing.City = row.City;
    requestMarketing.PostalCode = row.PostalCode;
    requestMarketing.Status = row.Status;
    requestMarketing.CreatedBy = row.CreatedBy;
    requestMarketing.CreatedDate = DataFormatter.DateToString(row.CreatedDate);
    requestMarketing.ModifiedBy = row.ModifiedBy;
    requestMarketing.ModifiedDate = DataFormatter.DateToString(row.ModifiedDate);

    requestMarketing.Province = row.Province;
    requestMarketing.Country = row.Country;

    return requestMarketing;
  }

  public static MapDBToArray(results: any): RequestMarketing[] {
    let requestMarketingArray: RequestMarketing[] = [];

    results.recordset.forEach(function(recordset) {
      let requestmarketing = RequestMarketing.MapDBToObject(recordset);
      requestMarketingArray.push(requestmarketing);
    });

    return requestMarketingArray;
  }

  public static MapObjectToArray(results: any): RequestMarketing[] {
    let requestMarketingArray: RequestMarketing[] = [];

    results.forEach(function(recordset) {
      let requestmarketing = RequestMarketing.MapDBToObject(recordset);
      requestMarketingArray.push(requestmarketing);
    });

    return requestMarketingArray;
  }

}
