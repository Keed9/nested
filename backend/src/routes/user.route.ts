
import { Router, Request, Response } from 'express';
import { check } from 'express-validator';
import { validationResult } from 'express-validator';
import UserController from '../controllers/users.controller';
import { Valids } from '../middlewares/valids.middleware';
import { Session } from '../helpers/sessions'; 

const router: Router = Router();
const userController: UserController = new UserController();

router.post('/login', [
    check('email', 'The email is not valid, try again').isEmail(),
    check('pwd', 'The password cannot be empty').notEmpty(),
    Valids.checkAll
], userController.login);

router.post('/register', [
    check('email', 'The mail is not valid, try with a valid one').isEmail(),
    check('pwd').custom(Valids.password),
    check('phone').custom(Valids.phone), 
    check('fName').custom(Valids.justLetters),
    check('lName').custom(Valids.justLetters),
    check('curp').custom(Valids.curp),
    check('avenue', 'Avenue cannot be empty').notEmpty(),
    check('extNumber', 'Exterior number cannot be empty').notEmpty(),
    check('city', 'City cannot be empty').notEmpty(),
    check('state', 'State cannot be empty').notEmpty(),
    check('country', 'Country cannot be empty').notEmpty(),
    check('utype').custom(Valids.justLetters),
    //check('admin', 'Admin cannot be empty').notEmpty(),
    Valids.checkAll,
    Session.verifySession 
], userController.register);


module.exports = router;
