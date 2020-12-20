import express from 'express';
import error from 'http-errors';
import _ from 'lodash';

import ordersService from '../services/ordersService.js'

const router = express.Router();

class OrdersRoutes {
    constructor() {
        router.get('/:idOrder', this.getOne);

    }

    async getOne(req, res, next) {
        const idOrder = req.params.idOrder;

        try {
            let order = await ordersService.retrieveById(idOrder);

            if (!order) {
                return next(error.NotFound(`La commande avec l'identifiant ${idOrder} est introuvable.`));
            }

            order = order.toObject({ virtuals: true });
            order = ordersService.transform(order);

            res.status(200).json(order);
        } catch (err) {
            return next(err);
        }
    }
    
}


export default router;
