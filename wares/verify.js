const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    console.log('Populated user:', req.user);

    const kampala = req.header('Authorization');

    if (!kampala) {
        req.user = null; //return res.status(403).json({ error: 'Token not provided' });
        return next();
    }

    const token = kampala.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Set the user on the request
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid', error: error.message });
      }
}

module.exports = verifyToken;