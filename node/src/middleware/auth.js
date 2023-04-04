const jwt = require('jsonwebtoken');
const {User} = require('../db/model')

const auth = async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        console.log(token,"auth");
        const verifyuser=jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyuser,"auth");
        const user=await User.findById({_id:verifyuser._id});
        console.log(user);
        req.token=token;
        req.user=user;
        console.log("success");
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports=auth;