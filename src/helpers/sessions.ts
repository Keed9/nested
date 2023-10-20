import * as jwt from 'jsonwebtoken';
import * as http from 'http';

interface ISession{
    valid: boolean,
    status: number,
    message: string,
    uid?: string | jwt.JwtPayload 
}

interface IPayload{
    uid: string
}

export default class Session{
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
}
