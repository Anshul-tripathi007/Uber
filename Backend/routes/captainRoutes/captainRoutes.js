const express=require('express');
const captainModel = require('../../models/captainModel');
const captainRouter=express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { authenticateCaptain } = require('../../middleware/authorization');
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

    return res.send(captain);
})


captainRouter.get("/login",async (req,res)=>{
    const {email,password}=req.body;

    const capexists=await captainModel.findOne({email})
    if(!capexists) return res.status(400).send("email not registered")

    const match=bcrypt.compareSync(password,capexists.password)
    if(!match) return res.status(400).send("invalid password")
        
    const token=jwt.sign({_id:capexists._id},JWT_SECRET,{expiresIn:'1h'})
    return res.send({token})
})

captainRouter.get("/profile",authenticateCaptain,async (req,res)=>{
    res.send(req.captain)
})

module.exports= captainRouter
