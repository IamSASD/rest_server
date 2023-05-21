import { pool } from "../db/config.db.js";
import {v4 as uuidv4} from 'uuid';
import bcryptjs from 'bcryptjs';

export const users_get = async(req, res) => {
    const {limit = 5, from = 0} = req.query;
    const [total, users] = await Promise.all([
        pool.query('SELECT COUNT(*) FROM user_table GROUP BY status HAVING status = true'),
        pool.query('SELECT * FROM user_table WHERE status = true OFFSET $1 LIMIT $2', [from, limit])
    ]);
    res.json({total: total.rows[0].count, users: users.rows});
}

export const users_put = async(req, res) => {
    const id = req.params.id;

    //Check against the DB
    const {password, google, ...rest} = req.body;
    if(password){
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password  = bcryptjs.hashSync(password, salt); 
    }

    const {rows} = await pool.query('SELECT name, email, password, role FROM user_table WHERE id = $1', [id]);
    const {name = rows[0].name, email = rows[0].email, role = rows[0].role} = rest;
    const values = [rest.password, email, role, name, id];

    try {
        const db_resp = await pool.query('UPDATE user_table SET password = $1, email = $2, role = (SELECT id FROM roles WHERE roles.role_name = $3), name = $4 WHERE id = $5', values);
        res.json({method: 'PUT', db_resp});
    }catch(err){
        res.json(err.stack);
    }
}

export const users_post = async(req, res) => {   
    const {name, email, password, role} = req.body;

    //Encrypt the password
    const salt = bcryptjs.genSaltSync();
    const hashed_password = bcryptjs.hashSync(password, salt); 
    //Save in db
    try {
        const arr_values = [uuidv4(), name, email, hashed_password, role]; 
        const resp = await pool.query('INSERT INTO user_table(id, name, email, password, role) VALUES($1, $2, $3, $4, (SELECT id FROM roles WHERE roles.role_name = $5))', arr_values); 
        res.json({method: 'post', by: 'sasdDev', resp}); 
    } catch (error) {
        const {code} = error;
        function msg_error(msg) {
            return res.status(400).json({err: msg});
        }
        switch(code){
            case '23505':
                msg_error('The email already exist');
            break;
            default:
                msg_error({error, msg_error: error.stack});
        }
    }
}

export const users_delete = async(req, res) => {
    const {id} = req.params;
    const resp = await pool.query('UPDATE user_table SET status = false WHERE id = $1', [id]);
    res.json(resp);
}
