import { Role } from "../../interface/Role";
import { Document } from "mongoose";

export type IUser = {
  role: Role;
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordChangedAt?: Date;
  status?: "active" | "blocked";
  isVerified?: boolean;
  otp?: number;
  otpExpires?: Date;
  gender?: "male" | "female" | "other";
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
};
export interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
