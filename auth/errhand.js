function handleError(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({message: 'user not authorized'})
    }

    if (err.name === 'ValidationError') {
        return res.status(401).json({message: 'user not validated'})
    }

    return res.status(500).json({message: 'server error'});
}

module.exports = handleError;