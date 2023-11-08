import { Request, Response } from 'express';
import UserModel from './../models/user.model';
import IUser from './../interfaces/user.interface';
import { Session } from './../helpers/sessions';

export default class UserController{

    public async login(req: Request, res: Response){
        try{
            const { email, pwd } = req.body;
            const userModel: UserModel = new UserModel();
            await userModel.findByEmail(email); 

            if(!userModel.user){
                res
                .status(404)
                .json({msg: 'User not found'});
                return;
            }

            if(userModel.user.status == 'DOWNED'){
                res
                .status(401)
                .json({msg: 'This user is not valid anymore'});
                return;
            }

            if(userModel.user.pwd != pwd){
                res
                .status(401)
                .json({msg: 'Password not match'});
                return;
            }

            const token: string = await Session.getJWT(userModel.user.uuid);

            res
            .status(200)
            .set({
                token
            })
            .json({
                user: userModel.user,
            });
        }catch(err: any){
            console.log(err);
            res
            .status(500)
            .json({msg: 'Something went wrong at::User controller - login'});
        }
    }

    public async register(req: Request, res: Response){
        try{
            const userModel: UserModel = new UserModel();
            const id: string | null  = await userModel.insert(req.body);
            await userModel.findById(id as string);

            res.status(200).json({
                user: userModel.user
            });
        }catch( err: any ){
            console.log(err)
            res.status(500).json({
                msg: 'Something went wrong inserting a new row'
            });
        }
    }
}


