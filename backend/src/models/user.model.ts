import mysql, { RowDataPacket } from 'mysql2/promise';
import Model from './../libs/model';
import IUser from './../interfaces/user.interface';



export default class UserModel extends Model {
    public user: IUser = {
        uuid: '',
        email: '',
        pwd: '',
        phone: '',
        name: '',
        curp: '',
        avatar: '',
        avenue: '',
        extNumber: '',
        intNumber: '',
        city: '',
        state: '',
        country: '',
        utype: '',
        status: '' 
    }; 

    constructor(){
        super();
    }

    public async insert(user: IUser, admin: string): Promise<string| null>{
       return new Promise((resolve, reject) => {
            //const userData = Object.values(user);
            //userData.push('INSERT');
            this.pool?.query<RowDataPacket[][]>(
                'CALL SP_USERS(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                [
                    user.email, 
                    user.pwd, 
                    user.phone, 
                    user.fName, 
                    user.lName, 
                    user.curp, 
                    '', 
                    user.avenue, 
                    user.extNumber, 
                    '',
                    user.city,
                    user.state,
                    user.country,
                    user.utype,
                    admin,
                    '',
                    'INSERT'
                ],
                (_err, rows) =>{ 
                    if(_err){
                        console.log(_err.message);
                        return reject(_err.message);
                    }
                    
                    if(rows[0].length != 1){
                        console.log('Cannot insert a row');
                        return resolve(null);
                    }

                    return resolve(rows[0][0][0]);
            }); 
       }); 
    }

    public async findById(id: string): Promise<IUser | null>{
        return new Promise((resolve, reject) => {
            this.pool?.query<RowDataPacket[][]>(
                'CALL SP_GET_USER(?, ?, ?);',
                [id, '', 'ID'],
                (_err, rows) => {
                    if(_err){
                        console.log(_err);
                        return reject(null);
                    }

                    if(rows[0].length != 1){
                        return resolve(null);
                    }

                    let i = 0;
                    Object.keys(this.user).forEach(key => {
                        this.user[key as keyof typeof this.user] = rows[0][0][i];
                        i++;
                    });
                    return resolve(this.user);
                });
        });
    }

    public async findByEmail( email: string ): Promise<IUser | null>{
        return new Promise((resolve , reject) => {
            this.pool?.query<RowDataPacket[][]>(
                'CALL SP_GET_USER(?, ?, ?);', 
                ['', email, 'EMAIL'],
                (_err, rows)=>{
                    if(_err){
                        console.log(_err);
                        return reject(null);
                    }

                    if(rows[0].length != 1){
                        return resolve(null);
                    }

                    let i = 0;
                    Object.keys(this.user).forEach(key => {
                        this.user[key as keyof typeof this.user] = rows[0][0][i];
                        i++;
                    });
                    return resolve(this.user);
                })
        });
    }
}


