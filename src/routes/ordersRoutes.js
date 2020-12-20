import express from 'express';
import error from 'http-errors';
import _ from 'lodash';

import ordersService from '../services/ordersService.js'

const router = express.Router();

class OrdersRoutes {
    constructor() {
        router.get('/', this.getAll);
    }

    async getAll(req, res, next) {
        const criteria = {};

        try {
            let orders = await ordersService.retrieveAll(criteria);

            orders = orders.map((o) => {
                o = o.toObject({ virtuals: true });
                o = ordersService.transform(o);
                return o;
            });

            res.status(200).json(orders);
        } catch (err) {
            return next(err);
        }
    }
}

new OrdersRoutes();

export default router;
