import * as http from 'http';
import * as fs from 'fs';
import 'dotenv/config'

import userRoutes from './routes/users.routes';

export default class Server{
    private port: string;
    private host: string;
    private server: http.Server ;
    //private host = process.env.LOCAL_HOST;

    public constructor(){
        //NULISH COALESCING OPERATOR (??)
        //CHECK ONLY FOR UNDEFINED OR NULL
        this.port = process.env.PORT?? '8080';
        this.host = process.env.HOST?? '127.0.0.1';

        this.server = http.createServer(this.routes);
    }

    private routes( req: http.IncomingMessage, res: http.ServerResponse) {
        const  url  = req.url ?? '/';
        const route: string = url.split('/')[1];
        switch( route ){
            case 'users':
                    userRoutes(req, res);
                break;
            default:
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Route not found mod', route}));
                break;
        }
    }

    public listener(){
       this.server.listen(this.port, () => {
            console.log(`Server running at => http://${this.host}:${this.port}/`);
       }); 
    }
}
