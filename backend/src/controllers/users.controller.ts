import { Request, Response } from 'express';
import UserModel from './../models/user.model';
import IUser from './../interfaces/user.interface';
import { Session } from './../helpers/sessions';
import Binarize from './../helpers/binarize.helper';
import path from 'path';

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
            iuser.avatar = req.file?.filename;
            const userModel: UserModel = new UserModel();
            const id: string | null  = await userModel.insert(iuser, res.locals.user);
            await userModel.findById(id as string);

            console.log('user inserted: ', userModel.user);
            userModel.user.avatar = path.join('uploads', userModel.user.avatar as string);

            res.status(200).json({
                //user: userModel.user
                user: userModel.user,
            });
        }catch( err: any ){
            console.log(err)
            res.status(500).json({
                msg: err
            });
        }
    }


    public async getUser(req: Request, res: Response){
        try{
            const {id} = req.params;
            const userModel: UserModel = new UserModel();
            await userModel.findById(id);
            userModel.user.avatar = path.join('uploads', userModel.user.avatar as string);
            res.status(200).json({user: userModel.user});
        }catch( _err ){
            console.log(_err);
            res.send(500).json({error: _err});
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

            userModel.user.avatar = path.join('uploads', userModel.user.avatar as string);

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

    public async update(req: Request, res: Response){ 
        try{
            const iuser: IUser = req.body;
            if(iuser.avatar != '')
                iuser.avatar = req.file?.filename;

            const userModel: UserModel = new UserModel();
            const id: string | null = await userModel.update(iuser, res.locals.user);
            await userModel.findById(id as string);

            console.log('user updated: ', userModel.user);

            res.status(200).json({
                user: userModel.user
            });
                
        }catch( err ){
            res.status(404).json({
                error: err
            });
        }
    }

    public async search(req: Request, res: Response){
        try{
            const { name } = req.params;
            const userModel: UserModel = new UserModel();
            const users = await userModel.findAllByName(name);
            users?.forEach( user => {
                user.avatar = path.join('uploads', user.avatar as string);
            });
            res.status(200).json({users});
        }catch( _err ){
            console.log(_err);
            res.status(500).json({error: _err});
        }
    }

}


