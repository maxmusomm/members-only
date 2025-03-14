const pool = require('./pool');

const getAllUsers = async () => {
    const { rows } = await pool.query('SELECT * FROM public.users');
    return rows;
}

const getUserById = async (_id) => {
    try {
        const { rows } = await pool.query('SELECT * FROM public.users WHERE id = $1', [_id]);
        return rows[0];
    } catch (error) {
        console.error("Error in getUserById:", error);
        throw error;
    }
}

const createUser = async (name, password) => {
    await pool.query('INSERT INTO public.users (name, password) VALUES ($1, $2)', [name, password]);
}

const createMessage = async (title, content, user_id) => {
    await pool.query('INSERT INTO public.messages (title, content, user_id) VALUES ($1, $2, $3)', [title, content, user_id]);
}
const getAllMessages = async () => {
    const { rows } = await pool.query('SELECT * FROM public.messages');
    return rows;
}

const getUserByName = async (name) => {
    const { rows } = await pool.query('SELECT * FROM public.users WHERE name = $1', [name]);
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