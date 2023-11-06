import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export namespace Valids{
    const _just_letters: RegExp = /^[a-zA-Z\u00C0-\u017F\s]+$/;
    const _pwd: RegExp = /^((?=.+[A-Za-z])(?=.+\d)(?=.+[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,})$/;
    const _phone: RegExp = /^\d{8,12}$/;
    const _curp: RegExp = /^[A-Z]{4}\d{6}[HM][A-Z]{5}\d{2}$/;

    export function curp(curp: string): Error | boolean{
        if(curp.length == 0 || !curp.match(_curp))
            throw new Error(`The curp ${curp} is not valid`);

        return true;
    }

    export function phone(phone: string): Error | boolean{
        if(phone.length == 0 || !phone.match(_phone))
           throw new Error(`The phone number ${phone} accept only numbers and must be between 8 and 12 numbers long`);

        return true;
    }


    export function justLetters (text: string): Error | boolean{
        if(text.length == 0 || !text.match(_just_letters))
            throw new Error(`There is a number on ${text}`);

        return true;
    }

    export function password(pwd: string): Error | boolean{
       if(pwd.length == 0 || !pwd.match(_pwd))
          throw new Error('Password must be at least 8 characters long, have 1 number and 1 special character'); 

        return true;
    }

    export function checkAll(req: Request, res: Response, next: any){
        const error = validationResult(req);
        if(!error.isEmpty())
            return res.status(400).json(error);

        next();
    }
}
