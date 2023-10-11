const  session  = require('../middlewares/session.js');



const checkSession = async(req, res, param = null) => {
    try{
        const sessionStatus = await session(req, res);
        console.log(sessionStatus.message);
        return sessionStatus;
    }catch(err){
        console.log(err.message);
        return err;
    }
}

const login = async(req, res) => {
    try{
        //IF SESSION ALREADY EXISTS
        const session = await checkSession(req, res); 
        console.log('Login ==>', session);
        res.writeHead( session.status, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(session));
    }catch( err ){

        //SESSION DOESNT EXISTS
        //PROCED TO LOGIN
        console.log('Login:error ==>', err);
        res.writeHead( err.status, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(err));
    }

    return;

}

module.exports = {
    login
};
