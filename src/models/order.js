import mongoose from 'mongoose';

const orderSchema = Mongoose.Schema({
    pizzeria: {
        // TODO: type: ,
        required: true
    },
    customer: {
        // TODO: type: ,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    pizzas : {
        // TODO: size, price, toppings
    }
}, {
    collection: 'orders', id: false
});

export default mongoose.model('Order', orderSchema);
