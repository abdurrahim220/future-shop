import { model, Schema } from "mongoose";
import { UserDocument } from "./user.interface";
import bcrypt from "bcryptjs";
const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    otp: {
      type: Number,
      required: false,
    },
    otpExpires: {
      type: Date,
      required: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    refreshTokenExpiresAt: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
});
UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedAt,
  jwtIssuedAt,
) {
  return (
    passwordChangedAt &&
    Math.ceil(passwordChangedAt.getTime() / 1000) > jwtIssuedAt
  );
};
UserSchema.index({ email: 1 });
UserSchema.index({ name: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });
export const UserModel = model<UserDocument>("User", UserSchema);
