import { ILookupService } from '../../../interfaces/iLookupService';
import { ILookup } from '../../../interfaces/iLookupController';
import { LookupService } from '../../../services/lookupService';

// The controller class is the entry point for the API calls.
// The controller's responsabilities are the following:

//      -   to implement the API calls.
//      -   to initiate the service class.
//      -   to call into the appropriate methods of the service class.
//      -   to return the service's methods results to the client.

// The controller is agnostic of the logic the service implements.
// The APIs are called via the following route: http://localhost:5200/newsfeed/

class LookupController implements ILookup {
    private service: ILookupService;

    constructor(router) {
        this.service = new LookupService();
        router.get('/tables/:tbl', this.getLookupTablesDynamically.bind(this));

    }

    getLookupTablesDynamically(req: any, res: any, next: any): Promise<any> {
        return this.service
            .getAllLookupByTableName(req, res, next)
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                console.log(err)
            });
    }

}

module.exports = LookupController;