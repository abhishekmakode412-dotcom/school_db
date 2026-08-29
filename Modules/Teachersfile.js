const mongoose = require("mongoose")
const teacherSchema = new mongoose.Schema({
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

    subject: {
        type: String,
        required: true
    },

    qualification: {
        type: String,
        required: true
    },

    experience: {
        type: Number,
        required: true
    },

    salary: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    }
})
const Teacher = mongoose.model("Teacher" , teacherSchema)
module.exports = Teacher