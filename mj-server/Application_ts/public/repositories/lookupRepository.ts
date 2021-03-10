import { SQLDBProvider } from '../providers/dbProvider/sqlDBProvider';
import { ILookupRepository } from "../interfaces/iLookupRepository";
import { Lookup } from '../models/lookup';
import { LogErrors } from '../common/logErrors.controller';

export class LookupRepository implements ILookupRepository {
    constructor() {}

    public async getAllLookupByTableNames(req:any,res:any,next:any): Promise<any> {

        var tbl = req.params.tbl;

        console.log(tbl);
        var tablename = "";
        var tableArray: string[] = ['status', 'category','schedule', 'time', 'repeat', 'weekdays', 'remindertype', 'country', 'province'];
        if (tableArray.includes(tbl)) {
            switch (tbl) {
                case "status":
                    tablename = "MJ.Lookup_Status";
                    break;
                case "category":
                    tablename = "MJ.Lookup_Category";
                    break;
                case "schedule":
                    tablename = "MJ.Lookup_Schedule";
                    break;
                case "time":
                    tablename = "MJ.Lookup_Time";
                    break;
                case "repeat":
                    tablename = "MJ.Lookup_RepeatType";
                    break;
                case "weekdays":
                    tablename = "MJ.Lookup_Weekdays";
                    break;
                case "remindertype":
                    tablename = "MJ.Lookup_ReminderType";
                    break;
                case "country":
                    tablename = "MJ.Lookup_Countries";
                    break;
                case "province":
                    tablename = "MJ.Lookup_Provinces";
                    break;
                default:
                    tablename = "";
                    break;
            }

            const staticTableName = tablename;
            let lookupArray: Lookup[] = [];
            let provider = new SQLDBProvider();
            let inputParameters: any[] = [];
            let CustomQuery = `SELECT * FROM ${staticTableName}`;
            await provider
            .executeQuery(CustomQuery)
            .then(results => {
                if (results) {
                lookupArray = Lookup.MapDBToArray(results);
                }
            })
            .catch(err => {
                return LogErrors.logErrors(err);
            });
        
            return lookupArray;
        }else{
            res.send('Invalud table name');
        }
      }

}