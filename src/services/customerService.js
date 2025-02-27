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

const updateCustomerService = async (id, name, email, address) => {
    try {
        const customer = await Customer.updateOne({ _id: id }, { name: name, email: email, address: address });
        return customer;
    } catch (error) {
        console.log("error >>> ", error)
        return null;
    }


}

const deleteCustomerService = async (id) => {
    try {
        const customer = await Customer.deleteById({ _id: id });
        return customer;

    } catch (error) {
        console.log("error >>> ", error)
        return null;
    }


}
module.exports = { createCustomerService, createArrayCustomerService, updateCustomerService, deleteCustomerService };