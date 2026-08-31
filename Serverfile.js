const express = require('express')
const connectDB = require("./Databasefile")
const passport = require("./Authentication")

const Studentroutes = require("./Studentsroutes")
const Teacherroutes = require("./Teacherroutes")

const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT || 4000;
  
//middle wear 
const logrequest = (req , res , next)=>{
    console.log(`${new Date().toLocaleString()} requeat made to : ${req.originalUrl} `)
    next()
}

app.get("/" , (req ,res)=>{
      console.log("hello abhishek")
   
      res.send("hello abhishek ")
})
app.use(logrequest)
app.use(passport.initialize())
const localmiddlewear = passport.authenticate('local', {session : false})
app.use("/student",localmiddlewear, Studentroutes)
app.use("/teacher" , Teacherroutes)
 
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`server is connected on port ${PORT}`);
    });
}
startServer();