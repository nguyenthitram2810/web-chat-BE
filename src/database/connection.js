import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
    console.log("MongoDB Connecting...")
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    console.log("MongoDB Connected")
}
module.exports = connectDB