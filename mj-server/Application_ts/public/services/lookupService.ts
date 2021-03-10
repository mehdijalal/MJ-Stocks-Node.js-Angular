import { ILookupService } from "../interfaces/iLookupService";
import { ILookupRepository } from "../interfaces/iLookupRepository";
import { MockLookupRepository } from "../repositories/mockLookupRepository";
import { LookupRepository } from "../repositories/lookupRepository";
import { Lookup } from "../models/lookup";

export class LookupService implements ILookupService {
    private repo: ILookupRepository;

    constructor() {
        let envName = process.env.ENV;
        if (envName !== 'test') {
            this.repo = new LookupRepository();
        } else {
            this.repo = new MockLookupRepository();
        }
    }

    async getAllLookupByTableName(req: any, res: any, next: any): Promise<any> {
        let lookup: Lookup[] = [];
        await this.repo
            .getAllLookupByTableNames(req, res, next)
            .then(results => (lookup = results))
            .catch(err => {
                next(err);
            });

        return lookup;
    }
}