import * as http from 'http';
import UserController from '../controllers/users.controller';

export default function userRoutes( req: http.IncomingMessage, res: http.ServerResponse ): void{
    const { url = '', method = 'GET' } = req;
    const userController: UserController = new UserController(req, res);
    if( url == '/users/login' && method === 'GET' ){
        userController.getLogin(req, res);
    }else if( url == '/users/login' && method == 'POST' ){
        userController.postLogin(req, res);
    }else{
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'User method not found'}));
    }


   return;

}
