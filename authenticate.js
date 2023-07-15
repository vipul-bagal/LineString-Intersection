
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //checking if auth header is missing
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized access!' });
        return;
    }

    const token = authHeader.split(' ')[1];

    if (token != 'mapup') {
        res.status(401).json({ error: 'Unauthorized access!' });
        return;
    }
    
    //if authHeader is not missing, execution will proceed further
    next();
}

module.exports = {
    authenticate
};