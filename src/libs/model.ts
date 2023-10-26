import * as mysql from 'mysql2';

interface IDBConfig{
    host: string,
    usr: string,
    pwd: string,
    db: string
};

export default class Model{
    constructor(){
        this.createConnection();
    }

    private createConnection(){
        try{

            this.conn = mysql.createConnection(this.iDBConfig)
            console.log('Database succesfully connected');

        }catch( err: any ){
            console.log('Database not connected::', err);
        }
    }

    public conn: mysql.Connection | null = null;
    private iDBConfig: IDBConfig = {
            host:  process.env.DB_HOST || '127.0.0.1',
            usr: process.env.DB_USER || 'selector',
            pwd: process.env.DB_PWD || '',
            db: process.env.DB || 'nested'
        }
}
