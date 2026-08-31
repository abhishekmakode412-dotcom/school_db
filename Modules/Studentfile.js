 const mongoose = require("mongoose")
 const bcrypt = require("bcrypt")
 const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true
    },

    class: {
        type: String,
        required: true
    },

    rollNumber: {
        type: Number,
        required: true,
        unique: true
    },

    address: {
        type: String,
        required: true
    },

    fees: {
        type: Number,
        required: true
    },
    username:{
        required : true,
        type : String
    },
    password:{
      required : true,
      type : String
    }
 });

 studentSchema.pre('save' , async(next)=>{
    const student = this;
    if(!student.isModified('password'))
        return next()
    try{
        const salt = await bcrypt.genSalt(10)
        const hashpassword =await bcrypt.hash(student.password , salt)
        student.password = hashpassword
        next();
    }catch(error){
      return next(error)
    }
 })

 studentSchema.method.comparePassword =async(candidatepassword)=>{
     try{
       const isMatch = await bcrypt.compare(candidatepassword , this.password )
       return isMatch
     }catch(error){
         throw error
     }
 }

 const Student = mongoose.model('Student' , studentSchema)
 module.exports = Student;