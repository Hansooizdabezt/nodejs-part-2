const express = require('express')
const { getAllUsers } = require('../controllers/apiController')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("this is a test api request")
})

router.get('/201', (req, res) => {
    res.status(201).json({
        data: {
            id: 1,
            name: "John Doe"
        },
        message: "this is a 201 response"

    })
})

router.get('/users', getAllUsers);



module.exports = router