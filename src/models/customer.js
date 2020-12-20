import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    planet: {
        type: String,
        required: true
    },
    coord: {
        lon: { required: true, type: Number, min: -1000, max: 1000 },
        lat: { required: true, type: Number, min: -1000, max: 1000 },
    },
    phone: {
        type: String,
        required: true,
        minLength: 16,
        maxLength: 16
    },
    birthday: {
        type: Date,
        required: true
    },
    referalCode: {
        type: String
    }
}, {
    collection: 'customers', id: false
});

export default mongoose.model('Customer', customerSchema);
