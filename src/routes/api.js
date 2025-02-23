const express = require('express')
const { getAllUsers, createUser, updateUser, deleteUser, postUploadSingleFileApi, postUploadMultipleFilesApi } = require('../controllers/apiController')

const router = express.Router()

router.get('/users', getAllUsers);

router.post('/users', createUser);

router.put('/users', updateUser);

router.delete('/users', deleteUser);

router.post('/file', postUploadSingleFileApi);

router.post('/files', postUploadMultipleFilesApi);





module.exports = router