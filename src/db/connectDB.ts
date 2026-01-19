import mongoose from "mongoose";
import { config } from "../config/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoDB as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};
