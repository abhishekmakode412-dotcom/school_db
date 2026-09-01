const express = require("express")
const router = express.Router()
const  {jwtauthmiddlewear , generatetoken}= require("./jwt")
const Student = require("./Modules/Studentfile")
const passport = require('./Authentication')
router.post("/signup", async (req, res) => {
      console.log("POST ROUTE HIT ");
    try {

        const newstudent = new Student(req.body)

        const savestudent = await newstudent.save()

        console.log("Student saved")
        const token = generatetoken({username:savestudent.username , _id:savestudent._id})

        res.status(201).json({savestudent:savestudent , token:token})

    } catch (error) {
        console.log("Student not saved:", error)

        res.status(500).json({
            message: "Student not saved",
            error: error.message
        })
    }
})
router.post('/login' , passport.authenticate('local' , {session : false}),(req , res)=>{
    try{
        res.status(201).json({message:"login successfull", student:req.user})
    }catch(error){
        res.status(404).json({message:"notfound" , error : error.message})
    }
})

router.get("/" ,async (req , res)=>{
    try{
        const  students = await Student.find()
        res.status(200).json(students)

    }catch(error){
         res.status(404).json( error , "not found")
    }
})

router.get('/:rollnumberType' , async (req , res)=>{
    try{
        const rollnumberType = Number(req.params.rollnumberType)
        const student = await Student.findOne({ rollNumber :rollnumberType})
        if(!student){
            res.status(404).json("not found")
        }
        else{
            res.status(201).json(student)
        }
    }catch(error){
          res.status(500).json(error , "internal server error")
    }
     
})

router.get("/range/:start/:end" , async (req , res)=>{
   try{
      const start = Number(req.params.start)
     const end = Number(req.params.end)
     const student = await Student.find( { rollNumber :{$gte : start , $lte:end} })
     if(student.length===0){
        res.status(404).json("Students not found")
     }
     res.status(200).json(student)
   }catch(error){
    res.status(500).json(error , "internall server error")
   }

})

router.put("/:rollNumber" , async(req , res)=>{
   try{
     const rollNumber = Number(req.params.rollNumber)
    const updatedstudent = await Student.findOneAndUpdate(
          {rollNumber : rollNumber},
          {$set : req.body},
          {new:true}
    )
    if(!updatedstudent){
       return res.status(404).json("not found")
    }
    res.status(200).json(updatedstudent)
   }catch(error){
    res.status(500).json(error , "internall server error")
   }
})

router.delete("/:rollNumber" , async(req , res)=>{
    try{
        const rollNumber = Number(req.params.rollNumber)
        const deletedstudent = await Student.findOneAndDelete({rollNumber : rollNumber })
        if(!deletedstudent){
            res.status(404).json({
                message : "not found"
            })
        }
        res.status(200).json("student delete successfully" , deletedstudent)
    }catch(error){
        res.status(500).json({
            message : "internall server error",
            error:error.message
        })
    }
})

module.exports = router