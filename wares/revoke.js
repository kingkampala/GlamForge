const User = require('../models/user');

async function isRevoked(req, payload, done) {
    try {
        const user = await User.findById(payload.userId);
        if (!user || !user.isAdmin) {
            return done(null, true);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.log('error in isRevoked:', error);
    }
}

module.exports = {
    isRevoked
};