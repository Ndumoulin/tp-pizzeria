import Order from '../models/order.js'
import mongoose from 'mongoose';

class OrdersService {

    ///////////////////////////////////////////////////////
    // GET
    //
    retrieveAll(criteria) {
        return Order.find(criteria);
    }

    retrieveById(idOrder) {
        // TODO: validators
        if (!mongoose.Types.ObjectId.isValid(idOrder)) return null;
        return Order.findById(idOrder);
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
