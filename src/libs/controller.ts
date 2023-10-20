import * as http from 'http';

export default class Controller{
    private data: string = '';

    constructor(){
    }

    public body( req: http.IncomingMessage, res: http.ServerResponse, callback: any){
        let buffer: string = ''
        req.on( 'data', chunk => buffer += chunk );
        req.on( 'end', () => {
            this.data = buffer;
            callback(this.data)
        });
    }
}
