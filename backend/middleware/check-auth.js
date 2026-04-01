import jwt from 'jsonwebtoken';
import HttpError from "../util/http-error.js";

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        if (!token) {
            throw new Error('Authentification échouée !');
        }
        const decodedToken = jwt.verify(token, 'cleSecrete!');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError('Authentification failed!', 401);
        return next(error);
    }
};

export default checkAuth;