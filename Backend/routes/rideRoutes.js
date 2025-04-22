const express=require('express');
const rideRouter=express.Router();
const { Ride } = require('../models/rideModel');
const { authenticateUser, authenticateCaptain } = require('../middleware/authorization');
const { generateOtp, calculateFare } = require('../services/rideService');
const {getAddressCoordinate,getCaptainsInTheRadius} = require('../services/mapServices');
const { sendMessageToSocketId } = require('../socket');


rideRouter.post("/create",authenticateUser, async (req,res)=>{

    const {pickup,destination,vehicleType}=req.body

    if(!pickup || !destination || !vehicleType) return res.status(400).send("please provide pickup and destination and vehicleType")

    const otp=generateOtp();
    const fare= await calculateFare(pickup,destination,vehicleType)
    const ride=new Ride({
        user:req.user._id,
        pickup,
        destination,
        fare,
        otp
    })
    await ride.save()
    res.send(ride)
    
    const coordinates=await getAddressCoordinate(pickup)
    const captainsInRadius=await getCaptainsInTheRadius(coordinates.ltd,coordinates.lng,300,vehicleType)
    const rideWithUser=await Ride.findById(ride._id).populate("user")
    rideWithUser.otp=""

    captainsInRadius.map(captain => {
        if(captain.vehicle.vehicleType===vehicleType){
            sendMessageToSocketId(captain.socketId,{
                event:"new-ride",
                data:rideWithUser
            })
        }

    });

})

rideRouter.get("/getAllFare",authenticateUser,async (req,res)=>{

    const {pickup,destination}=req.query

    if(!pickup || !destination) return res.status(400).send("please provide pickup and destination")

    const fare= await calculateFare(pickup,destination,'all')
    res.status(200).send(fare)
})

rideRouter.post('/confirm',authenticateCaptain, async (req,res)=>{

    const { rideId } = req.body

    if (!rideId ) return res.status(400).send("please provide rideId")

    await Ride.findByIdAndUpdate(rideId, {
        status: 'accepted',
        captain: req.captain._id
    })

    const ride=await Ride.findById(rideId).populate("user").populate("captain").select("+otp")
    if(!ride) return res.status(400).send("ride not found")
    sendMessageToSocketId(ride.user.socketId, {
        event: "ride-confirmed",
        data: ride
    })

    res.status(200).send(ride)
})

rideRouter.post("/start",authenticateCaptain,async (req,res)=>{

    const {rideId,otp}=req.body

    if(!rideId || !otp) return res.status(400).send("please provide rideId and otp")

    const ride=await Ride.findById(rideId).populate("user").select("+otp")
    if(!ride) return res.status(400).send("ride not found")
    
    if(ride.otp!==otp) return res.status(400).send("invalid otp")
    if(ride.status!=="accepted") return res.status(400).send("ride not accepted")
    
    await Ride.findByIdAndUpdate(rideId, {
        status: 'ongoing',
        otp: undefined
    })
    sendMessageToSocketId(ride.user.socketId, {
        event: "ride-started",
        data: ride
    })

    res.status(200).send(ride)
})

rideRouter.post("/end",authenticateCaptain,async (req,res)=>{
    const {rideId}=req.body

    if(!rideId) return res.status(400).send("please provide rideId")

    const ride=await Ride.findById(rideId).populate("user").populate("captain")

    if(ride.status!=="ongoing") return res.status(400).send("ride not started")

    await Ride.findByIdAndUpdate(rideId, {
        status: 'completed'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: "ride-ended",
        data: ride
    })

    res.send("ride ended successfully")
})

module.exports=rideRouter