const jwt = require('jsonwebtoken'); 

const HttpError = require("../models/http-error");

module.exports = (req,res,next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) { 
            throw new Error('Authentification ratée !');
        }
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        req.userData = { userId: decodedToken.teacherId }
        next();
    }
    catch(err) {
        const error = new HttpError('Authentification ratée !', 401);
        return next(error);
    }
};