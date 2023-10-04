function handleError(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: { message: 'user not authorized', details: err.message } });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: { message: 'user not validated', details: err.message } });
    }

    console.error(err);
    return res.status(500).json({ error: { message: 'server error' } });
}

module.exports = handleError;