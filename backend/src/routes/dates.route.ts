
import { Request, Response, Router } from 'express';
import DatesController from '../controllers/dates.controller';
import { Session } from '../helpers/sessions';
import { check } from 'express-validator';
import { validationResult } from 'express-validator';
import { Valids } from '../middlewares/valids.middleware';

const router: Router = Router();
const datesController: DatesController = new DatesController();

router.post('/schedule',[
    check('hour').notEmpty(),
    check('patient').notEmpty(),
    check('comments').notEmpty(),
    Valids.checkAll,
    Session.verifySession 
],datesController.schedule ); 



module.exports = router;
