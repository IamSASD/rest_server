import { pool } from '../db/config.db.js';

export const valid_role = async(role) => {
    const {rows} = await pool.query('SELECT * FROM roles');
    const exist_role = rows.some(value => value.role_name === role);
    if(!exist_role){
        throw new Error(`The role ${role} does not exist in the database}`);
    }
}