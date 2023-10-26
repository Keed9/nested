import * as mysql from 'mysql2/promise';
import Model from './../libs/model';
import IUser from './../interfaces/user.interface';



export default class UserModel extends Model{

    private user: IUser | null = null;
    constructor(){
        super();
    }

    public async getByEmail( email: string ) {
      try{

        const result = await this.conn?.query(
            "CALL SP_GET_USER(?, ?, ?)", 
            ['', email, 'EMAIL']
        );

        await this.conn?.end();
        return;
      }catch( err: any ){
        console.log(err);
        return;
      } 
    }
   
}
