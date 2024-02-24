import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    try {
        console.log("Connecting to the database...");
        await mongoose.connect(config.db.url);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;