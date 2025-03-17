module.exports.logOut = async(req,res)=>{
    res.set('authorization','')
    res.send("user logged out")
}