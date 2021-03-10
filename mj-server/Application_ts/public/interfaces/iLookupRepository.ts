import { Lookup } from "../models/lookup";

export interface ILookupRepository {
    getAllLookupByTableNames(req:any, res:any,next:any): Promise<any>;
    //getAllStaticWithId(req?:any, res?:any,next?:any): Promise<any>;
}
