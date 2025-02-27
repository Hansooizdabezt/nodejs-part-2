const {
    uploadSingleFile,
    uploadMultipleFiles,
} = require("../services/fileService");
const Customer = require("../models/customer");
const { createCustomerService, createArrayCustomerService, updateCustomerService, deleteCustomerService } = require("../services/customerService");

const createCustomer = async (req, res) => {
    try {
        let { email, name, phone, address, description } = req.body;

        let imageUrl = "";

        if (!req.files || Object.keys(req.files).length === 0) {
            // bỏ qua nếu người dùng không upload file
        } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
        }

        let customerData = {
            email,
            name,
            phone,
            address,
            description,
            image: imageUrl,
        };

        let customer = await createCustomerService(customerData);

        res.status(201).json({
            message: "Creating customer successfully",
            data: customer,
        });
    } catch (error) {
        console.log("Error Create User: " + error);
        res.status(500).json({
            message: "Error creating customer",
        });
    }
};

const createListCustomers = async (req, res) => {
    try {
        let customer = await createArrayCustomerService(req.body.customers)
        if (customer) {
            res.status(201).json({
                message: "Creating array customer successfully",
                data: customer,
            });
        } else {
            console.log("Error Create User: " + error);
            res.status(500).json({
                message: "Error creating array customer",
            });
        }



    } catch (error) {
        console.log("Error Create User: " + error);
        res.status(500).json({
            message: "Error creating array customer",
        });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        let customers = await Customer.find();
        if (customers) {
            res.status(201).json({
                message: "Getting All customer successfully",
                data: customers,
            });
        } else {
            console.log("Error Getting All customer: " + error);
            res.status(500).json({
                message: "Error Getting All customer",
            });
        }

    } catch (error) {
        console.log("Error Create User: " + error);
        res.status(500).json({
            message: "Error Getting All customer",
        });
    }
}

const updateCustomer = async (req, res) => {
    let { id, name, email, address } = req.body;
    try {
        const result = await updateCustomerService(id, name, email, address);
        if (result) {
            return res.status(200).json({
                message: 'Update user successfully'
            });
        } else {
            console.log("Error Update User: " + error);
            return res.status(500).json({
                message: 'Error updating user'
            });
        }
    } catch (error) {
        console.log("Error Update User: " + error);
        return res.status(500).json({
            message: 'Error updating user'
        });
    }

}

const deleteCustomer = async (req, res) => {
    let id = req.body.id;
    try {
        const result = await deleteCustomerService(id);
        if (result) {
            return res.status(200).json({
                message: 'Delete user successfully'
            });
        } else {
            console.log("Error Delete User: " + error);
            return res.status(500).json({
                message: 'Error Delete user'
            });
        }
    } catch (error) {
        console.log("Error Delete User: " + error);
        return res.status(500).json({
            message: 'Error Delete user'
        });
    }
}

module.exports = {
    createCustomer, createListCustomers,
    getAllCustomers, updateCustomer, deleteCustomer
};
