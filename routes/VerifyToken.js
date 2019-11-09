const jwt = require('jsonwebtoken');

/**
   * Checking auth-token is verifying or not
   **/
module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Please register yourself to get token");

    try{
        const verified = jwt.verify(token,process.env.SECRET_KEY);
        req.user = verified;
        next();

    }catch(err){
        res.status(401).send('Invalid Token');
    }


}

