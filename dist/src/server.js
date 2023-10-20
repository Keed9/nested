"use strict";
const http = require('http');
const fs = require('fs');
require('dotenv').config();
class Server {
    port;
    host;
    server;
    //private host = process.env.LOCAL_HOST;
    constructor() {
        //NULISH COALESCING OPERATOR (??)
        //CHECK ONLY FOR UNDEFINED OR NULL
        this.port = process.env.PORT ?? '8080';
        this.host = process.env.HOST ?? '127.0.0.1';
        this.server = http.createServer(this.routes);
    }
    routes(req, res) {
        const { url } = req;
        const route = url.split('/')[1];
        switch (route) {
            case 'user':
                //userRoutes(req, res);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Route not found', route }));
                break;
        }
    }
    listener() {
    }
}
