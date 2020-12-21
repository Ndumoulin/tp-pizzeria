import Pizzeria from '../models/pizzeria.js'

import ordersService from '../services/ordersService.js';

class PizzeriasService {

    ///////////////////////////////////////////////////////
    // GET
    //
    retrieveByCriteria(criteria) {
        return Pizzeria.find(criteria);
    }

    retrieveById(idPizzeria, options) {
        const query = Pizzeria.findById(idPizzeria);

        if (options.isOrdersEmbed) {
            query.populate('orders');
        }

        return query;
    }

    ///////////////////////////////////////////////////////
    // CREATE
    //
    create(pizzeria) {
        return Pizzeria.create(pizzeria);
    }

    ///////////////////////////////////////////////////////
    // TRANSFORM
    //
    transform(pizzeria, transformOption = {}, options = {}) {
        if (transformOption) {
            // TODO: transformations
        }

        if (options.isOrdersEmbed) {
            pizzeria.orders = pizzeria.orders.map(p => {
                p = ordersService.transform(p);
                return p;
            });
        }

        pizzeria.href = `${process.env.BASE_URL}pizzerias/${pizzeria._id}`;
        pizzeria.lightspeed = `[${pizzeria.planet}]@(${pizzeria.coord.lat};${pizzeria.coord.lon})`;

        delete pizzeria._id;
        delete pizzeria.__v;

        return pizzeria;
    }
}

export default new PizzeriasService();
