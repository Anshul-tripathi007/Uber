const jwt=require('jsonwebtoken');
const { User } = require('../models/userModel');
const JWT_SECRET = "secret#uber@2025"

module.exports.authenticateUser=async (req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization;
    if(!token) return res.status(401).send("unauthorized")

    try{
        var decoded = jwt.verify(token,JWT_SECRET)
        const user=await User.findById(decoded._id)
        req.user=user
        return next()
    }
    catch(err){
        return res.status(401).send({err})
    }
}