import * as jwt from 'jsonwebtoken';
import * as http from 'http';

import Session from './../helpers/sessions';
import Controller from './../libs/controller';


export default class UserController extends Controller{
    constructor( req: http.IncomingMessage, res: http.ServerResponse ){
        super(); //INITIALIZE CONTROLLER CLASS
    }

    public async getLogin(req: http.IncomingMessage, res: http.ServerResponse){
        //IF IS NOT A SESSION OPENED, SESSION STATUS FALSE
        const session = await Session.verifySession(req);
        if(!session.valid){
            console.log('Login::', session);
            res.writeHead( session.status, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(session));
            return;
        }

        //IF A SESSION IS OPENED, SEND USER INFO AND SESSION TRUE
        res.writeHead( 200, {'Content-Type': 'application/json'});
        //GET USER INFO
        //const user = new User();
        res.end(JSON.stringify({
            'session': true,
            'user': 'Jhon Doe',
            'uid': session.uid
        }));
        return;
    }

    public async postLogin( req: http.IncomingMessage, res: http.ServerResponse ){
        const session = await Session.verifySession(req);
        //IF THERE IS A SESSION, THEN LOGIN IS NO LOGER NEDED
        if(session.valid){
            res.writeHead( session.status, { 'Content-Type': 'application/json' });
            res.end( JSON.stringify(session));
            return;
        }
        
        
        const data = this.body( req, res, (data: string) => {
            //PRINT FOR DEV ONLY
            //console.log( JSON.parse( data ) );
            const token: string = Session.newSession('12345');
            res.setHeader('token', token);
            res.writeHead( 200, { 'Content-Type': 'application/json' });
            res.end( data );
        });
    }
}

