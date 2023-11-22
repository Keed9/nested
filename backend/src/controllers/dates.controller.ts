import { Request, Response } from 'express';


export default class DatesController{
    public async schedule( req: Request, res: Response ){
        try{
            console.log(req.body);
            res.status(200).json(req.body);
        }catch( _err ){
            console.log(_err);
            res.status(500).json({error: _err});
        }
    }
}
