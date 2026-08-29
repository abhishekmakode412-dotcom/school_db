const express = require('express')
const Databasefile = require("./Databasefile")

const Studentroutes = require("./Studentsroutes")
const Teacherroutes = require("./Teacherroutes")

const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.get("/" , (req ,res)=>{
      console.log("hello abhishek")
   
      res.send("hello abhishek ")
})
app.use("/student" , Studentroutes)
app.use("/teacher" , Teacherroutes)
 
app.listen( 4000 , ()=>{
    console.log("server is connected")
}
)