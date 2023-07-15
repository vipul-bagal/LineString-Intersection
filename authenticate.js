
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //checking if auth header is missing
    if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized access!' });
        return;
    }

    //if authHeader is not missing, execution will proceed further
    next();
}

module.exports = {
    authenticate
};