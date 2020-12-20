import Order from '../models/order.js'

import mongoose from 'mongoose';

const TAXES_PERCENTAGE = 0.0087;

class OrdersService {

    ///////////////////////////////////////////////////////
    // GET
    //
    retrieveAll(criteria) {
        return Order.find(criteria);
    }

    retrieveByCriteria(criteria) {
        // TODO: validators
        if (!mongoose.Types.ObjectId.isValid(criteria._id)) return null;
        return Order.find(criteria);
    }

    ///////////////////////////////////////////////////////
    // CREATE
    //
    create(order) {
        return Order.create(order);
    }

    ///////////////////////////////////////////////////////
    // TRANSFORM
    //
    transform(order, transformOption = {}) {
        if (transformOption) {
            // TODO: transformations
        }

        order.href = `${process.env.BASE_URL}pizzerias/${order.pizzeria}/orders/${order._id}`;
        order.customer = { "href": `${process.env.BASE_URL}customers/${order.customer}` };
        order.pizzeria = { "href": `${process.env.BASE_URL}pizzerias/${order.pizzeria}` };

        // Calculer le sous-total de la commande
        let tmpTotal = 0;
        order.pizzas.forEach(p => {
            tmpTotal += p.price;
        });
        order.subTotal = tmpTotal.toFixed(3);
        order.taxeRates = TAXES_PERCENTAGE;
        const taxes = tmpTotal * TAXES_PERCENTAGE;
        order.taxes = taxes.toFixed(3);
        order.total = (tmpTotal + taxes).toFixed(3);

        delete order._id;
        delete order.__v;

        return order;
    }
}

export default new OrdersService();
