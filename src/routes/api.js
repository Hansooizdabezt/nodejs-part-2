const express = require('express')
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/apiController')

const router = express.Router()

router.get('/users', getAllUsers);

router.post('/users', createUser);

router.put('/users', updateUser);

router.delete('/users', deleteUser);




module.exports = router