const express=require('express');
const captainModel = require('../../models/captainModel');
const captainRouter=express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "secret#uber@2025"


captainRouter.post("/signup",async (req,res)=>{
    const {name,email,password,vehicle}=req.body;
    if(!name || !email || !password || !vehicle) return res.status(400).send("all fields are madatory")
    
    const captainexists=await captainModel.findOne({email})
    if(captainexists) return res.status(400).send("user alreadys exists")

    const hashpwd=await bcrypt.hash(password,10);

    const captain = new captainModel({
        name,
        email,
        password:hashpwd,
        vehicle
    })
    await captain.save()

    const token=jwt.sign({_id:captain._id},JWT_SECRET,{expiresIn:"1h"});

    return res.send({token});
})

module.exports= captainRouter
