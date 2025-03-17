module.exports.getProfile=async(req,res)=>{
    return res.send(req.user)
}