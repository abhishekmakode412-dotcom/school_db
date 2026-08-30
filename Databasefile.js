const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL).then(
    ()=>{
        console.log("mongodb atlaas is connected")
    }
).catch(
    (error)=>{
       console.log("server is not connected")
       console.log(error)
    }
)

const Databasefile = mongoose.connection;

Databasefile.on("disconnected" , ()=>{
    console.log('server is disconnected')
})

module.exports=Databasefile