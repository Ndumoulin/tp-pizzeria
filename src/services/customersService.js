import Customer from '../models/customer.js'

import mongoose from 'mongoose'
import dayjs from 'dayjs';

class CustomersService {

    ///////////////////////////////////////////////////////
    // GET
    //
    retrieveAll(criteria) {
        return Customer.find(criteria);
    }

    retrieveById(idCustomer) {
        if (!mongoose.Types.ObjectId.isValid(idCustomer)) return null;
        return Customer.findById(idCustomer);
    }

    ///////////////////////////////////////////////////////
    // CREATE
    //
    create(customer) {
        return Customer.create(customer);
    }

    ///////////////////////////////////////////////////////
    // UPDATE
    //
    update(idCustomer, customer) {
        const filter = { _id: idCustomer };
        return Customer.findOneAndUpdate(filter, customer, { new: true });
    }

    ///////////////////////////////////////////////////////
    // TRANSFORM
    //
    transform(customer, transformOption = {}) {
        if (transformOption) {
            // TODO: transformations
        }

        customer.href = `${process.env.BASE_URL}customers/${customer._id}`;
        customer.phone = `[${customer.phone.substr(0, 4)}]${customer.phone.substr(4, 4)}-${customer.phone.substr(8, 6)}@${customer.phone.substr(10, 2)}`;
        customer.age = dayjs().diff(customer.birthday, 'year');
        customer.lightspeed = `[${customer.planet}]@(${customer.coord.lat};${customer.coord.lon})`;

        delete customer._id;
        delete customer.__v;

        return customer;
    }
}

export default new CustomersService();
