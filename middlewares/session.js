const jwt = require('jsonwebtoken');
const { readConfig }= require('../helpers/readFiles');

const session = (req, res) => {
    return new Promise((resolve, reject) => {
        const { token }= req.headers
        console.log(req.headers);
        console.log('Token==>', token);

        if( !token ){
            reject({
                valid: false,
                status: 401,
                message: 'Session Closed',
            });
        }    

        const { JWT } = readConfig();
        const { uid } = jwt.verify(token, JWT, (err, token) => {
            if(err){
                reject({
                    valid: false,
                    status: 401,
                    message: 'Session invalid',
                });
            }
        }); 

        //RETURN USE ID 
        resolve({
            valid: true,
            status:200,
            message: 'Session Open'
        });
        
    });
}

module.exports = session;
