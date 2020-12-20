import Order from '../models/order.js'
import pizzeria from '../models/pizzeria.js';

import mongoose from 'mongoose';

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

        order.href = `${process.env.BASE_URL}orders/${order._id}`;

        delete order._id;
        delete order.__v;

        return order;
    }
}

export default new OrdersService();
