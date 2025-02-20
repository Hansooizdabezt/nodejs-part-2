const User = require('../models/user');

const getAllUsers = async (req, res) => {
    let users = await User.find();
    return res.status(200).json({
        data: users,
        message: 'Get all users successfully'
    });
}

module.exports = { getAllUsers }