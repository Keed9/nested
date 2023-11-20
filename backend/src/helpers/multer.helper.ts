
import { Express, Request } from 'express';
import multer from 'multer';
import path from 'path';

//MULTER STORAGE CONFIG
type DestinationCallback = ( err: Error | null, destination: string ) => void;
type FileNameCallback = ( err: Error | null, filename: string) => void;

const storage = multer.diskStorage({
    destination: ( req: Request, file: Express.Multer.File, cb: DestinationCallback ): void => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: ( req: Request, file: Express.Multer.File, cb: FileNameCallback ): void => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const newFileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
        cb(null, newFileName);
    }

});

const upload = multer({storage: storage});
export default upload;


