
import express, { Express, Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

export default class Server{
   private port: number | string = ''; 
   private app: Application | null = null;

    constructor(){
        this.port = process.env.PORT || 3000;

        if(!this.app){
            this.app = express();
        }

        this.middlewares();
        this.routes();
    }

    private middlewares(){
        //CORS ROUTES
        this.app?.use(cors());

        //GET INFORMATION ON JSON FORMAT
        this.app?.use(bodyParser.json());

        //IT PARSES INCOMING REQUESTS WITH URL ENCODED PAYLOADS IS PASED
        //ON A BODY PARSER
        this.app?.use(bodyParser.urlencoded({extended: true}));

        this.app?.use(bodyParser.raw());

    }

    private routes(){
        //SPECIFY THE ROUTES TO USE
        this.app?.use( '/users',require('./routes/user.route'));
        this.app?.use( '/dashboard', require('./routes/dashboard.route'));
        this.app?.get('*', (req: Request, res: Response) => {
            res.status(404).json({
                message: 'Route not found'
            });
        });
    }

    //LISTEN SERVER
    public listener(){
        this.app?.listen( this.port, () => {
            console.log( `Server running at http://localhost:${this.port}`);
        });
    }
}

