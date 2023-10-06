const http = require('http');
const fs = require('fs');
const { readConfig }= require('./helpers/readFiles');

class Server{
    constructor(){
        this.envs = readConfig();


        this.server = http.createServer(this.routes); 
    }

    //ROUTES LOGIC
    routes(req, res){
        let url = req.url;
        url = url.split('/');
        url.shift();
        console.log(url);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello world');
    }

    listener(){
        this.server.listen(this.envs.PORT, this.envs.HOSTNAME, () => {
            console.log(`Server running at http://${this.envs.PORT}:${this.envs.HOSTNAME}/`);
        });
    }
}

const server = new Server();
server.listener();



// ADD ENVIORMENT VARIABLES


