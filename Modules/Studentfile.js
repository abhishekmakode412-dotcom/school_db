 const mongoose = require("mongoose")
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
    }
 });

 const Student = mongoose.model('Student' , studentSchema)
 module.exports = Student;