import mongoose from "mongoose";
import { config } from "../config/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoDB as string);
    console.log("MongoDB connected");

    // Automatically activate any existing products
    if (mongoose.connection.db) {
      const result = await mongoose.connection.db.collection("products").updateMany(
        { status: { $ne: "active" } },
        { $set: { status: "active" } }
      );
      if (result.modifiedCount > 0) {
        console.log(`Auto-activated ${result.modifiedCount} products.`);
      }
    }
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};
