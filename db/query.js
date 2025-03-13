const pool = require('./pool');

const getAllUsers = async () => {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
}

const getUserById = async (_id) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [_id]);
    return rows[0];
}

const createUser = async (name, password) => {
    await pool.query('INSERT INTO users (name, password) VALUES ($1, $2)', [name, password]);
}

const createMessage = async (title, content, user_id) => {
    await pool.query('INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)', [title, content, user_id]);
}
const getAllMessages = async () => {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
}

const getUserByName = async (name) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
    return rows[0];
}

const deleteMessage = async () => {

}

module.exports = {
    createUser,
    getAllUsers,
    getUserByName,
    getUserById,
    getAllMessages,
    createMessage,
}