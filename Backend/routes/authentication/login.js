const { User } = require("../../models/userModel");
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');
const JWT_SECRET = "secret#uber@2025"

exports.logIn=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password) return res.status(400).send("all fields are mandatory");

    const user =await User.findOne({email})
    if(!user) return res.status(400).send("email not registered")

    const match=bcrypt.compareSync(password,user.password)
    if(!match) return res.status(400).send("invalid password")
        
    const token=jwt.sign({_id:user._id},JWT_SECRET,{expiresIn:'1h'})
    return res.send({token})
}