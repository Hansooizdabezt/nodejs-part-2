const connection = require('../config/database');
const User = require('../models/user');
const { getAllUsers, getUserById, updateUserbyId, handleCreateUser, deleteUserById } = require('../services/CRUDService')

const getHomePage = async (req, res) => {
    let results = await User.find();
    return res.render('home.ejs', { listUsers: results });
}

const getCreateUserPage = async (req, res) => {
    return res.render('createUser.ejs')
}

const createUser = async (req, res) => {
    let { email, name, city } = req.body;

    await User.create({ email, name, city });
    res.redirect('/');
}

const getEditUserPage = async (req, res) => {
    const userId = req.params.id;
    let user = await User.findById(userId);
    return res.render('editUser.ejs', { user: user })
}

const updateUser = async (req, res) => {
    let { email, name, city, userId } = req.body;

    await User.updateOne({ _id: userId }, { email, name, city });

    res.redirect('/');
}

const getDeleteUserPage = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId);
    return res.render('deleteUser.ejs', { user: user })
}

const deleteUser = async (req, res) => {
    let { userId } = req.body;
    await deleteUserById(userId);
    res.redirect('/');
}

module.exports = { getHomePage, createUser, getCreateUserPage, getEditUserPage, updateUser, getDeleteUserPage, deleteUser }