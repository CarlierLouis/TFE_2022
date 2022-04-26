const jwt = require('jsonwebtoken'); 

const HttpError = require("../models/http-error");

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error('Authentification ratée !');
        }
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        req.userData = { teacherId: decodedToken.teacherId }
        next();
    }
    catch(err) {
        const error = new HttpError('Authentification ratée !', 401);
        return next(error);
    }
};