const http = require('http');
const fs = require('fs');
const { readConfig }= require('./helpers/readFiles');
const { userRoutes } = require('./routes/user.routes');

class Server{
    constructor(){
        this.envs = readConfig();
        this.server = http.createServer(this.routes); 
    }

    //ROUTES LOGIC
    routes(req, res){
        const { method, url } = req;
        const route = url.split('/')[1];
        switch( route ){
            case 'users':
                    userRoutes(req, res);
                break;
            default:

                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Route not found', route}));
                break;
        }
    
        //let url = req.url;
        //url = url.split('/');
        //url.shift();
        //console.log(url);

    
    }

    listener(){
        this.server.listen(this.envs.PORT, this.envs.HOSTNAME, () => {
            console.log(`Server running at http://${this.envs.HOSTNAME}:${this.envs.PORT}/`);
        });
    }
}

const server = new Server();
server.listener();



// ADD ENVIORMENT VARIABLES


