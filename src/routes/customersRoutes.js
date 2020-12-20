import express from 'express';
import error from 'http-errors';
import _ from 'lodash';

import customersService from '../services/customersService.js';

const router = express.Router();

class CustomersRoutes {
    constructor() {
        router.get('/', this.getAll);
    }

    async getAll(req, res, next) {
        const criteria = {};

        try {
            let customers = await customersService.retrieveAll(criteria);

            customers = customers.map((c) => {
                c = c.toObject({ virtuals: true });
                c = customersService.transform(c);
                return c;
            });

            res.status(200).json(customers);
        } catch (err) {
            return next(err);
        }
    }
}

new CustomersRoutes();

export default router;
