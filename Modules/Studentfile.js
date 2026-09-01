const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
console.log("student file loaded")
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

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

 //Password hashing 
 studentSchema.pre("save", async function() {

    console.log("PRE SAVE PASSWORD:", this.password);

    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash( this.password, salt );

    console.log("HASHED PASSWORD:", hashpassword);

    this.password = hashpassword;
});


// Password comparison
studentSchema.methods.comparePassword = async function(candidatepassword) {

    try {

        const isMatch = await bcrypt.compare(
            candidatepassword,
            this.password
        );

        return isMatch;

    } catch (error) {

        throw error;

    }
};


const Student = mongoose.model("Student", studentSchema);

module.exports = Student;