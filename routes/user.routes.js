const { checkSession, login } = require('../controllers/user.controller');

const userRoutes = async(req, res) => {
    const { url, method } = req;
    const urlSegments = url.split('/');
    const [, , accion, param] = urlSegments;
    if( accion === 'login' && method === 'POST'){
        return await login(req, res);
    }
    
    res.writeHead(404, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify({message: 'Route not found'}));
}

module.exports = {
    userRoutes
}
