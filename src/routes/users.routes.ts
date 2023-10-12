import * as http from 'http';

export default function userRoutes( req: http.IncomingMessage, res: http.ServerResponse ): void{
    const { url = '', method = 'GET' } = req;
    if( url == '/users/login' && method === 'GET' ){
        //controllerLogin(req, res);
        res.writeHead( 200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'Message': 'User login route'}));
    }

   return;

}
