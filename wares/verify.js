const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    console.log('Populated user:', req.user);

    const token = req.header('Authorization');

    if (!token) {
        req.user = null; //if no token, set req.user to null. 
        return next();
    }

    const decoded = jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            req.user = null;
        } else {
            req.user = decoded;
        }
        next();
    });
    console.log('Decoded token:', decoded);
}

module.exports = verifyToken;