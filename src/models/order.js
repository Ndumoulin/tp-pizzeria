import mongoose from 'mongoose';

const orderSchema = Mongoose.Schema({
    pizzeria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pizzeria',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    pizzas: [
        {
            size: { type: String, required: true },
            price: { type: Number },
            toppings: [
                { type: String, required: true }
            ]
        },
    ]
}, {
    collection: 'orders', id: false
});

export default mongoose.model('Order', orderSchema);
