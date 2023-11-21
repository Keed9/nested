
import fs  from 'fs';

namespace Binarize{
    export function readFile(path: string, mimetype: string): Blob | boolean  {
        let result: Blob | boolean = true;
        fs.readFile(path, (err, data) => {
            if(err){
                console.log('Error::Binarize', err);
                result = false;
            }

            result = new Blob([data], {type: mimetype});
            console.log(result);
        });

        return result;
    }

}

export default Binarize;
