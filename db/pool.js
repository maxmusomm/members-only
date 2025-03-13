const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const {
    DATABASE_URL } = process.env;

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Render/Supabase connection
});


module.exports = pool;