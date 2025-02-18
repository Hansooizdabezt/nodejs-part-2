const express = require('express')
const { getHomePage, createUser, getCreateUserPage, getEditUserPage, updateUser, getDeleteUserPage, deleteUser } = require('../controllers/homeController');
const { deleteUserbyId } = require('../services/CRUDService');

const router = express.Router()

router.get('/', getHomePage)

router.post('/create-user', createUser);

router.get('/create-user-page', getCreateUserPage);

router.get('/edit-user-page/:id', getEditUserPage);

router.post('/edit-user', updateUser);


router.post('/delete-user', deleteUser);


router.get('/delete-user/:id', getDeleteUserPage);


module.exports = router