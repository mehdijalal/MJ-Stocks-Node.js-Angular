import { Lookup } from "../models/lookup";

export interface ILookup {
    getLookupTablesDynamically(req:any, res:any,next:any): Promise<any>;
    //getAllStaticWithId(req?:any, res?:any,next?:any): Promise<any>;
}
