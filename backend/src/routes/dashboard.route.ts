import { Request, Response, Router } from 'express';
import { Valids } from '../middlewares/valids.middleware';
import { Session } from '../helpers/sessions'; 
import UserController from '../controllers/users.controller';

const router: Router = Router();
const userController: UserController = new UserController();

router.get('/user/:id', [
    Session.verifySession,
], userController.dashboard);

router.get('/user', [
    Session.verifySession,
], userController.dashboard);

module.exports = router;
