const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) =>{
    console.log(req.method);
}

module.exports = authMiddleWare