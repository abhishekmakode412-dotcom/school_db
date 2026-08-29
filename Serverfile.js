const express = require('express')
const Databasefile = require("./Databasefile")

const Studentroutes = require("./Studentsroutes")
const Teacherroutes = require("./Teacherroutes")

const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT || 4000;

app.get("/" , (req ,res)=>{
      console.log("hello abhishek")
   
      res.send("hello abhishek ")
})
app.use("/student" , Studentroutes)
app.use("/teacher" , Teacherroutes)
 
app.listen( PORT , ()=>{
    console.log("server is connected")

}
) 