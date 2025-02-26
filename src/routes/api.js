const express = require('express')
const { getAllUsers, createUser, updateUser, deleteUser, postUploadSingleFileApi, postUploadMultipleFilesApi } = require('../controllers/apiController');
const { createCustomer, createListCustomers } = require('../controllers/customerController');

const router = express.Router()

//user
router.get('/users', getAllUsers);

router.post('/users', createUser);

router.put('/users', updateUser);

router.delete('/users', deleteUser);

router.post('/file', postUploadSingleFileApi);

router.post('/files', postUploadMultipleFilesApi);


//customer
// router.get('/customers', getAllUsers);

router.post('/customers', createCustomer);
router.post('/customers-many', createListCustomers);

// router.put('/customers', updateUser);

// router.delete('/customers', deleteUser);

// router.post('/file', postUploadSingleFileApi);

// router.post('/files', postUploadMultipleFilesApi);





module.exports = router