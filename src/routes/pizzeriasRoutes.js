import express from 'express';
import error from 'http-errors';
import _ from 'lodash';

import pizzeriasService from '../services/pizzeriasService.js'

const router = express.Router();

class PizzeriasRoutes {
    constructor() {
        router.get('/', this.getAll);
        router.get('/:idPizzeria', this.getOne);
        router.post('/', this.post);
    }

    // TODO: Paramètres d'URL
    // TODO: Middlewares
    async getAll(req, res, next) {
        const criteria = {};

        try {
            let pizzerias = await pizzeriasService.retrieveAll(criteria);

            pizzerias = pizzerias.map((p) => {
                p = p.toObject({ virtuals: true });
                p = pizzeriasService.transform(p);
                return p;
            });

            res.status(200).json(pizzerias);
        } catch (err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        const idPizzeria = req.params.idPizzeria;

        try {
            let pizzeria = await pizzeriasService.retrieveById(idPizzeria);

            if (!pizzeria) {
                return next(error.NotFound(`La pizzeria avec l'identifiant '${idPizzeria}' est introuvable.`));
            }

            pizzeria = pizzeria.toObject({ virtuals: true });
            pizzeria = pizzeriasService.transform(pizzeria);

            res.status(200).json(pizzeria);
        } catch (err) {
            return next(err);
        }
    }

    async post(req, res, next) {
        const newPizzeria = req.body;
        
        try {
            if (_.isEmpty(req.body)) {
                return next(error.BadRequest());
            }
            
            let pizzeria = await pizzeriasService.create(newPizzeria);

            pizzeria = pizzeria.toObject({ virtuals: true });
            pizzeria = pizzeriasService.transform(pizzeria);

            res.header('Location', pizzeria.href);
            if (req.query._body === 'false') {
                res.status(201).end();
            } else {
                res.status(201).json(pizzeria);
            }
        } catch (err) {
            return next(err);
        }
    }
}

new PizzeriasRoutes();

export default router;
