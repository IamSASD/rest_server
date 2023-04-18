import { pool } from "../db/config.db.js";
import {v4 as uuidv4} from 'uuid';
import bcryptjs from 'bcryptjs';
import {validationResult} from 'express-validator';

export const users_get = (req, res) => {
    const query_params = req.query;
    res.json({method: 'get', by: 'sasdDev', query_params});
}

export const users_put = (req, res) => {
    const id = req.params.id;
    res.json({method: 'put', by: 'sasdDev', id});
}

export const users_post = async(req, res) => {
    //Check if the email is valid
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    const {name, email, password, role} = req.body;

    //Encrypt the password
    const salt = bcryptjs.genSaltSync();
    const hashed_password = bcryptjs.hashSync(password, salt); 
    //Save in db
    try {
        const arr_values = [uuidv4(), name, email, hashed_password, role];
        await pool.query('INSERT INTO user_table(id, name, email, password, role) VALUES($1, $2, $3, $4, $5)', arr_values);
        res.json({method: 'post', by: 'sasdDev', arr_values});
    } catch (error) {
        const {code} = error;
        function msg_error(msg) {
            return res.status(400).json({err: msg});
        }
        switch(code){
            case '23505':
                msg_error('The email already exist');
            break;

            case '23514':
                msg_error('The role is not valid');
        }
    }
}

export const users_delete = (req, res) => {
    res.json({method: 'delete', by: 'sasdDev'});
}