const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoURL = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL ,{
            serverSelectionTimeoutMS: 10000
        });
        console.log("MongoDB Atlas is connected");
    } catch (error) {
        console.log("MongoDB is not connected");
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;