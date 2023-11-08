import mysql, { Pool, createPool } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export default class Model{
    public pool: Pool | null = null; 

    constructor(){
        try{
            this.pool = mysql.createPool({
                connectionLimit: 10,
                host: process.env.BD_HOST || '127.0.0.1',
                user: process.env.BD_USR || 'keed',
                password: process.env.DB_PWD || 'Kingslayer9k!!',
                database: process.env.DB || 'NESTED',
                rowsAsArray: true
            });

            console.log('Conecction succesfully');
        }catch( err: any){
           console.log('Somenthing went wrong trying connection pool'); 
        }     
    }
}
