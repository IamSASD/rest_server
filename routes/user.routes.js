import {Router} from 'express'
import {check} from 'express-validator';
import { users_delete, users_get, users_post, users_put } from '../controllers/user.controller.js';
import { check_fields } from '../middlewares/check_fields.js';
import { valid_role } from '../helpers/db_validators.js';

export const router = Router();

router.get('/', users_get);

router.put('/:id', users_put);

router.post('/', [
    check('email', 'The email is not valid').isEmail(),
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must have at least 6 letters').isLength({min: 6}),
    check('role').custom(valid_role),
    check_fields
] ,users_post);

router.delete('/', users_delete);
