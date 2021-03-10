import { Lookup } from "../models/lookup";

export interface ILookupService {
    getAllLookupByTableName(req:any, res:any,next:any): Promise<any>;
    //getAllStaticWithId(req?:any, res?:any,next?:any): Promise<any>;
}
