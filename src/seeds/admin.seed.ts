import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { UserModel } from "../modules/user/user.model";
import { config } from "../config/config";

const seedAdmin = async () => {
  try {
    await mongoose.connect(config.mongoDB as string);

    console.log("📦 Database connected");

    const existingAdmin = await UserModel.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("✅ Admin already exists. Seed skipped.");
      process.exit(0);
    }

    // 4️⃣ Create admin user
    await UserModel.create({
      name: "Super Admin",
      email: config.ADMIN_EMAIL as string,
      phone: config.ADMIN_PHONE as string,
      password: config.ADMIN_PASSWORD as string,
      role: "admin",
      status: "active",
      isVerified: true,
    });

    console.log("🎉 Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
    process.exit(1);
  }
};

seedAdmin();
