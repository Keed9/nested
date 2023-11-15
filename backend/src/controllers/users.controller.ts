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
                .json({error: 'User not found'});
                return;
            }

            if(userModel.user.status == 'DOWNED'){
                res
                .status(401)
                .json({error: 'This user is not valid anymore'});
                return;
            }

            if(userModel.user.pwd != pwd){
                res
                .status(401)
                .json({error: 'Password not match'});
                return;
            }

            const token: string = await Session.getJWT(userModel.user.uuid as string);

            res.setHeader('token', token);

            res
            .status(200)
            .json({
                user: userModel.user,
                token
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
            const iuser: IUser = req.body;
            const userModel: UserModel = new UserModel();
            const id: string | null  = await userModel.insert(iuser, res.locals.user);
            await userModel.findById(id as string);

            res.status(200).json({
                //user: userModel.user
                user: userModel.user,
            });
        }catch( err: any ){
            console.log(err)
            res.status(500).json({
                msg: 'Something went wrong inserting a new row'
            });
        }
    }

    public async dashboard(req: Request, res: Response){
        try{

            const { id } = req.params;
            const userModel: UserModel= new UserModel();
            if(id == "" || id == undefined){
                await userModel.findById(res.locals.user);
            }else{
                await userModel.findById(id);
            }

            if(!userModel.user)
                throw new Error('User not found');

            res.status(200).json({
                user: userModel.user
            });
            
        }catch( err ){
            res.status(404).json({
               error: err 
            });
        }
    }
}


