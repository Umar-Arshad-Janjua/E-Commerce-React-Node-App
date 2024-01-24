const jwt = require('jsonwebtoken');
const User = require('../model/schema');
const SECRET_KEY = "THISISUMARARSHADJANJUASTUDENTOFBTUCOTTBUS"
require('../model/schema');


const authenticate = async(req , res , next) =>{
try{
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, SECRET_KEY)
    const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token })

    if(!rootUser){throw new Error("No user found")}
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
}
catch(err){
    res.status(401).send("Un-Authorized user")
    console.log("Error")

}
}


module.exports = authenticate;