const connection = require('../config/database')

const getAllUsers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Users u')
    return results
}

const getUserById = async (userId) => {
    const [results, fields] = await connection.query(`select * from Users where id = ?`, [userId])
    let user = results && results.length ? results[0] : {}
    return user;
}

const updateUserbyId = async (email, name, city, userId) => {
    const [results, fields] = await connection.query(
        `UPDATE Users
        SET email = ?, name =?, city =? WHERE id = ?`,
        [email, name, city, userId])
}

const handleCreateUser = async (email, name, city) => {
    const [results, fields] = await connection.query(
        `INSERT INTO Users(email, name, city)
        VALUES(?, ?, ?)`,
        [email, name, city])
}

const deleteUserById = async (userId) => {
    const [results, fields] = await connection.query(`DELETE FROM Users WHERE id =?`, [userId])
}

module.exports = { getAllUsers, getUserById, updateUserbyId, handleCreateUser, deleteUserById }