const { expressjwt: expressJwt } = require('express-jwt');
const { isRevoked } = require('../wares/revoke');

const secret = process.env.JWT_SECRET;
const port = process.env.API_URI;

function jwtAuth() {
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/api\/products(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            { url: /\/api\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            { url: /\/api\/orderitems(.*)/, methods: ['GET', 'OPTIONS'] },
            `/users/login`,
            `/users/register`
        ]
    })
}

module.exports = jwtAuth;