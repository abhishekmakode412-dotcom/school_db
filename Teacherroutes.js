const express = require("express")
const router = express.Router()
const Teacher = require("./Modules/Teachersfile")

router.post("/" , async(req,res)=>{
      try{
        const newteacherdata =  req.body
        const newteachers = new Teacher(newteacherdata)
        const Saveteacher = await newteachers.save()
        res.status(200).json(Saveteacher)
      }catch(error){
          res.status(404).json(error , "teachers not found")
      }
})

router.get("/" , async(req , res)=>{
 try{
      const teachers = await Teacher.find()
   res.status(201).json(teachers)
 }catch(error){
    res.status(404).json(error , "Teacher not found")
 }

})

router.get("/:subjectType", async(req , res)=>{
  try{
       const subjectType = req.params.subjectType
    if(subjectType=="Mathematics" || subjectType=="Chemistry"){
        const response =  await Teacher.find({subject: subjectType})
        res.status(201).json(response)
    }else{
     res.json(404).json("not found")
    }
  }catch{
    res.status(500).json("something went wrong")
  }

})

module.exports = router;