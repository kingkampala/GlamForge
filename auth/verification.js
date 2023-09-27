const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = process.env.JWT_SECRET;

async function verifyToken(req, res, next) {
  const token = req.header('authorization');

  if (!token) {
    return res.status(403).json({ message: 'a token is required for authentication', });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'token has expired' });
    } else {
      return res.status(500).json({ message: 'internal server error' });
    }
  }
};

module.exports = verifyToken;