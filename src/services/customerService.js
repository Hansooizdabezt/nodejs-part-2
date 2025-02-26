const Customer = require('../models/customer');


const createCustomerService = async (customerData) => {
    try {
        const newCustomer = await Customer.create({
            email: customerData.email,
            name: customerData.name,
            phone: customerData.phone,
            address: customerData.address,
            image: customerData.image,
            description: customerData.description
        });
        return newCustomer;
    } catch (error) {
        console.log("Error creating customer: ", error)
        return null;
    }

}

const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result;

    } catch (error) {
        console.log("Error creating array customer: ", error)
    }
}

module.exports = { createCustomerService, createArrayCustomerService };