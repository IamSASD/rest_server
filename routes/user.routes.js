import {Router} from 'express'
import {check} from 'express-validator';
import { users_delete, users_get, users_post, users_put } from '../controllers/user.controller.js';

export const router = Router();

router.get('/', users_get);

router.put('/:id', users_put);

router.post('/', [
    check('email', 'The email is not valid').isEmail(),
] ,users_post);

router.delete('/', users_delete);
