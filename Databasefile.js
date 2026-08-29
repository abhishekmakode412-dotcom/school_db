const mongoose = require("mongoose")
const mongoURL = "mongodb://localhost:27017/schooldb"
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