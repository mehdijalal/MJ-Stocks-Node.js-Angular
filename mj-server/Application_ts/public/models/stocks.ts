// This is the model's class.

// The model's class responsabilities are the following:

//  -   It models the business that is behind the application.
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.

export class Stocks {
  // data members need to be initiated to be mapped by mapping functions below
  public NewsfeedID: number = 0;
  public StatusID: number = 0;
  public Title: string = '';
  public CreatedDate: string = '';
  public CreatedBy: string;
  public ModifiedBy: string;
  public ModifiedDate: string;
  public Headline: string = '';
  public NewsfeedContent: string = '';
  public PublishedDate: boolean;
  public Name:string;
  constructor() {}

  public static MapDBToObject(row: any): Stocks {
    let newFeed: Stocks = new Stocks();

    newFeed.NewsfeedID = row.NewsfeedID;
    newFeed.StatusID = row.StatusID;
    newFeed.Title = row.Title;
    newFeed.CreatedDate = row.CreatedDate;
    newFeed.CreatedBy = row.CreatedBy;
    newFeed.ModifiedBy = row.ModifiedBy;
    newFeed.ModifiedDate = row.ModifiedDate;
    newFeed.Headline = row.Headline;
    newFeed.NewsfeedContent = row.NewsfeedContent;
    newFeed.PublishedDate = row.PublishedDate;
    newFeed.Name = row.Name;

    return newFeed;
  }

  public static MapDBToArray(results: any): Stocks[] {
    let newFeedsArray: Stocks[] = [];

    results.recordset.forEach(function(recordset) {
      let newFeed = Stocks.MapDBToObject(recordset);
      newFeedsArray.push(newFeed);
    });

    return newFeedsArray;
  }

  public static MapObjectToArray(results: any): Stocks[] {
    let newFeedsArray: Stocks[] = [];

    results.forEach(function(recordset) {
      let newFeed = Stocks.MapDBToObject(recordset);
      newFeedsArray.push(newFeed);
    });

    return newFeedsArray;
  }
}
