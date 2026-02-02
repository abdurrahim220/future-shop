import { Role } from "../../interface/Role";
import { Document, Model } from "mongoose";

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
  isDeleted?: boolean;
  sellerRequest?: "pending" | "approved" | "rejected" | "not_requested";
};
export interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
export interface UserModelType extends Model<UserDocument> {
  isJWTIssuedBeforePasswordChanged(
    passwordChangedAt: Date,
    jwtIssuedAt: number,
  ): boolean;
}
