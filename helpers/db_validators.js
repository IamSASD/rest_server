import { pool } from '../db/config.db.js';

export const valid_role = async(role) => {
    const {rows} = await pool.query('SELECT * FROM roles');
    const exist_role = rows.some(value => value.role_name === role);
    if(!exist_role){
        throw new Error(`The role ${role} does not exist in the database}`);
    }
} 

export const exist_id = async(id) => {
    const {rows} = await pool.query('SELECT id FROM user_table');
    const existID = rows.some(value => value.id === id);
    if(!existID){
        throw new Error(`The id '${id}' does not exist in the database`);
    }
}
