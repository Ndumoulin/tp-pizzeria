import Customer from '../models/customer.js'

class CustomersService {

    ///////////////////////////////////////////////////////
    // GET
    //
    retrieveAll(criteria) {
        return Customer.find(criteria);
    }

    ///////////////////////////////////////////////////////
    // TRANSFORM
    //
    transform(customer, transformOption = {}) {
        if (transformOption) {
            // TODO: transformations
        }

        customer.href = `${process.env.BASE_URL}customers/${customer._id}`;

        delete customer._id;
        delete customer.__v;

        return customer;
    }
}

export default new CustomersService();
