const bcrypt = require('bcrypt');
const { User } = require('../../models/userModel');
const saltRounds = 10;

exports.signUp=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password) return res.status(400).send("all fields are mandatory");

    const userExists=await User.findOne({email})
    if(userExists) return res.status(400).send("user already exists")
    
    await bcrypt.hash(password,saltRounds, async (err,hash)=>{
        if(err) return res.status(500).send("error hashing the password")
        
        const user =new User({
            name,email,
            password:hash
        })
        await user.save()
        return res.status(201).send(user)
    })

}