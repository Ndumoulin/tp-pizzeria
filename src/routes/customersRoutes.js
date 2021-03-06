import express from 'express';
import error from 'http-errors';
import _ from 'lodash';

import customersService from '../services/customersService.js';

const router = express.Router();

class CustomersRoutes {
    constructor() {
        router.get('/', this.getAll);
        router.get('/:idCustomer', this.getOne);
        router.put('/:idCustomer', this.put);
        router.post('/', this.post);
    }

    // TODO: Paramètres d'URL: page, limit, planet -> test 'Pualia'
    // TODO: Middlewares: pagination, filtré croissant croissant customer.birthday
    // C3 - Obtenir tous les clients - Thomas Lessard
    async getAll(req, res, next) {
        const criteria = {};

        try {
            let customers = await customersService.retrieveByCriteria(criteria);

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
  
    // C4 - Obtenir un client spécifique - Nathan Dumoulin
    async getOne(req, res, next) {
        const idCustomer = req.params.idCustomer;

        try {
            let customer = await customersService.retrieveById(idCustomer);

            if (!customer) {
                return next(error.NotFound(`Le client avec l'identifiant '${idCustomer}' est introuvable.`));
            }

            customer = customer.toObject({ virtuals: true });
            customer = customersService.transform(customer);

            res.status(200).json(customer);
        } catch (err) {
            return next(err);
        }
    }
    
    // C2 - Mise à jour complète d’un client - Thomas Lessard
    async put(req, res, next) {
        const idCustomer = req.params.idCustomer;

        try {
            let customerMod = await customersService.update(idCustomer, req.body);

            if (!customerMod) {
                return next(error.NotFound(`Le client avec l'identifiant '${idCustomer}' est introuvable.`));
            }

            customerMod = customerMod.toObject({ virtuals: true });
            customerMod = customersService.transform(customerMod);

            res.header('Location', customer.href);
            if (req.query._body === 'false') {
                res.status(204).end();
            } else {
                res.status(201).json(customer);
            }
        } catch(err) {
            return next(err);
        }
    }

    // C1 - Ajouter un client - Nathan Dumoulin
    async post(req, res, next) {
        const newCustomer = req.body;

        if (_.isEmpty(req.body)) {
            return next(error.BadRequest());
        }
        
        try {
            let customer = await customersService.create(newCustomer);

            customer = customer.toObject({ virtuals: true });
            customer = customersService.transform(customer);

            res.header('Location', customer.href);
            if (req.query._body === 'false') {
                res.status(204).end();
            } else {
                res.status(201).json(customer);
            }
        } catch (err) {
            return next(err);
        }
    }
}

new CustomersRoutes();

export default router;
