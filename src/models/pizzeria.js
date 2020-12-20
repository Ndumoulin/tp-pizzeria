import mongoose from 'mongoose';

const pizzeriaSchema = mongoose.Schema({
    planet: {
        type: String,
        required: true
    },
    coord: {
        lon: { required: true, type: Number, min: -1000, max: 1000 },
        lat: { required: true, type: Number, min: -1000, max: 1000 },
    },
    chef: {
        name: { required: true, type: String },
        ancestor: { required: true, type: String },
        speciality: { required: true, type: String },
    }
}, {
    collection: 'pizzerias', id: false
});

export default mongoose.model('Pizzeria', pizzeriaSchema);
