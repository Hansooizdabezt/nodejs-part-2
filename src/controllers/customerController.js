const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService');
const Customer = require('../models/customer')
const { createCustomerService } = require('../services/customerService')

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

        let customerData = { email, name, phone, address, description, image: imageUrl };

        let customer = await createCustomerService(customerData);

        res.status(201).json({
            message: 'Creating customer successfully',
            data: customer
        });

    } catch (error) {
        console.log("Error Create User: " + error);
        res.status(500).json({
            message: 'Error creating customer'
        });
    }
}

module.exports = { createCustomer }