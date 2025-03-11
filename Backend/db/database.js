const mongoose=require('mongoose')
const pwd = "TkFT66EuXisODZ0v";
const uri=`mongodb+srv://anshul3558:${pwd}@anshulcluster.tnvo6.mongodb.net/?retryWrites=true&w=majority&appName=AnshulCluster`

exports.connectToDB=mongoose.connect(uri)