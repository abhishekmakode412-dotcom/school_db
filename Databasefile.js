const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL).then(
    ()=>{
        console.log("server is connected")
    }
).catch(
    ()=>{
       console.log("server is not connected")
    }
)

const Databasefile = mongoose.connection;

Databasefile.on("disconnected" , ()=>{
    console.log('server is disconnected')
})

module.exports=Databasefile