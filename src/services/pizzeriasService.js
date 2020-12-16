import Pizzeria from '../models/pizzeria.js'

class PizzeriasService {
    retrieveAll(criteria) {
        return Pizzeria.find(criteria);
    }
}

export default new PizzeriasService();