import { Types } from "mongoose";

export interface IAddress {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  division: string;
  district: string;
  upazilla: string;
  village: string;
  phone: string;
  email: string;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
