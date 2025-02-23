const User = require('../models/user');
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService');

const getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        return res.status(200).json({
            message: 'Get all users successfully',
            data: users
        });
    } catch (error) {
        console.log("Error Get All User: " + error);
        res.status(500).json({
            message: 'Error getting all users'
        });
    }
}

const createUser = async (req, res) => {
    try {
        let { email, name, city } = req.body;

        const newUser = await User.create({ email, name, city });
        return res.status(201).json({
            message: 'Create user successfully',
            data: newUser
        });
    } catch (error) {
        console.log("Error Create User: " + error);
        res.status(500).json({
            message: 'Error creating user'
        });
    }
}

const updateUser = async (req, res) => {
    try {
        let { email, name, city, userId } = req.body;

        await User.updateOne({ _id: userId }, { email, name, city });
        return res.status(200).json({
            message: 'Update user successfully'
        });
    } catch (error) {
        console.log("Error Update User: " + error);
        res.status(500).json({
            message: 'Error updating user'
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        let { userId } = req.body;
        await User.deleteOne({ _id: userId });
        return res.status(200).json({
            message: 'Delete user successfully'
        });
    } catch (error) {
        console.log("Error Delete User: " + error);
        res.status(500).json({
            message: 'Error deleting user'
        });
    }
}

const postUploadSingleFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let result = await uploadSingleFile(req.files.image);
    console.log("result = ", result)
    return res.status(200).json({
        EC: 0,
        data: result
    })
}

const postUploadMultipleFilesApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFiles(req.files.image);

        return res.status(200).json({
            EC: 0,
            data: result
        })
    } else {
        return await postUploadSingleFileApi(req, res);
    }
}

module.exports = {
    getAllUsers, createUser, updateUser, deleteUser,
    postUploadSingleFileApi, postUploadMultipleFilesApi
}