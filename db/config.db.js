import pg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

export const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD
});
