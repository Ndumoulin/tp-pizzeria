import express from 'express';
import error from 'http-errors';

import pizzeriasService from '../services/pizzeriasService.js'

const router = express.Router();

class PizzeriasRoutes {
    constructor() {
        router.get('/', this.getAll);
    }

    async getAll(req, res, next) {
        const criteria = {};
        
        try {
            let pizzerias = await pizzeriasService.retrieveAll(criteria);

            res.status(200).json(pizzerias);
        } catch(err){
            return next(err);
        }
    }
}

new PizzeriasRoutes();

export default router;