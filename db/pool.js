const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const {
    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = new Pool({
    host: DB_HOST || 'localhost',
    port: DB_PORT || 4000,
    database: DB_NAME || 'membership',
    user: DB_USER || 'postgres',
    password: DB_PASSWORD || 'MMaster(1',
});

module.exports = pool;