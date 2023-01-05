const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.json('user not authorizet', 401);
        }
        const decodeToken = jwt.verify(token, 'do_not_share');
        req.userData = decodeToken;
        next();
    } catch (error) {
        return res.json('user not authorizet', 401)
    }

}

module.exports = authMiddleWare