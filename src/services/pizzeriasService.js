import Pizzeria from '../models/pizzeria.js'
import mongoose from 'mongoose';

class PizzeriasService {

    ///////////////////////////////////////////////////////
    // GET
    //
    retrieveAll(criteria) {
        return Pizzeria.find(criteria);
    }

    retrieveById(idPizzeria) {
        // TODO: validators
        if (!mongoose.Types.ObjectId.isValid(idPizzeria)) return null;
        return Pizzeria.findById(idPizzeria);
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
    transform(pizzeria, transformOption = {}) {
        if (transformOption) {
            // TODO: transformations
        }

        pizzeria.href = `${process.env.BASE_URL}pizzerias/${pizzeria._id}`;
        pizzeria.lightspeed = `[${pizzeria.planet}]@(${pizzeria.coord.lat};${pizzeria.coord.lon})`;

        delete pizzeria._id;
        delete pizzeria.__v;

        return pizzeria;
    }
}

export default new PizzeriasService();
