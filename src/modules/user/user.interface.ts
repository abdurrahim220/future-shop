import { Role } from "../../interface/Role";

export type IUser = {
  _id?: string;
  role: Role;
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordChangedAt?: Date;
  status?: "active" | "blocked";
  otp?: number;
  otpExpires?: Date;
  createdAt?: string;
  updatedAt?: string;
};
