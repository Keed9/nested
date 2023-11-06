import * as JWT from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserModel from './../models/user.model';

interface ISession{
    valid: boolean,
    status: number,
    message: string,
    uid?: string | JWT.JwtPayload 
}

interface IPayload{
    uid: string
}

export namespace Session{

    const secretKey = process.env.SECRET_KEY;

    export function getJWT(uid: string): Promise <string>{
        return new Promise((resolve, reject) => {
            const payload: IPayload = { uid };
            const options: JWT.SignOptions = {
                expiresIn: '1h',
                algorithm: 'HS256'
            }

            //const secretKey = process.env.SECRET_KEY;
            JWT.sign(payload, secretKey as string, options, (_err, token) => {
                if(_err){
                    console.log(_err);
                    return reject('Cannot get a token for session');
                }

                return resolve(token as string);
            });
        });
        
    } 

    //MIDDLEWARE TO VERIFY TOKEN
    export async function verifySession(req: Request, res: Response, next: any){
        const token: string | undefined = req.header('token');
        if(!token){
            return res.status(401).json({
                msg: 'There is no token on the header'
            });
        }

        try{
            const { uid } = JWT.verify(token, secretKey as string) as ISession;
            const userModel: UserModel = new UserModel();
            await userModel.findById( uid as string );
            if( !userModel.user)
                return res
                        .status(401)
                        .json({msg: 'Use doesnt exists'});
            

            if( userModel.user.state == 'DOWNED')
                return res
                        .status(401)
                        .json({msg: 'User is not active anymore'});


            Object.assign(req, {user: userModel.user.uuid});
            next(); 
        }catch(_err: any){
            console.log(_err);
            res.status(500).json({msg: 'Token no valido'});
        }
    }
}

/*class Session{
    constructor(){}

    private static session: ISession;

    public static newSession(uid: string): string{
        const payload: IPayload = {uid};

        const options: jwt.SignOptions = {
            expiresIn: '1h',
            algorithm: 'HS256'
        }

        const secretKey: string = process.env.JWT?? '';

        const token = jwt.sign(payload, secretKey, options);
        return token;
    }

    public static async verifySession( req: http.IncomingMessage ): Promise<ISession>{
        try{
            Session.session = await Session.verifySessionToken( req );
            //PRINTS FOR DEV ONLY
            //console.log( Session.session );
            return Session.session; 
        }catch( err: any ){
            //PRINTS FOR DEV ONLY
            //console.log( err.session );
            Session.session = err;
            return Session.session;
        }
    }

    private static async verifySessionToken( req: http.IncomingMessage ): Promise<ISession>{
        return new Promise(( resolve, reject ) => {
            let { token = '' } = req.headers;
            token = token.toString();
            
            // FOR NOT SENDING A TOKEN SESSION IT REJECTS
            if( token == '' )
                reject({
                    valid: false,
                    status: 401,
                    message: 'No token session'
                });

            //VERIFY TOKEN SESSION
            try{
                const jwtSecretKey = process.env.JWT?? '';
                const { uid } = jwt.verify( token, jwtSecretKey ) as ISession;
                resolve({
                    valid: true,
                    status: 200,
                    message: 'Session open',
                    uid 
                });
            }catch( err: any ){
                reject({
                    valid: false,
                    status: 401,
                    message: 'Token session invalid'
                });
            }
        });
    }
}*/
