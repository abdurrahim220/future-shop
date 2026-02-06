import { Types } from "mongoose";

export interface INotifications {
  _id: Types.ObjectId;
  type: string;
  referenceId: Types.ObjectId;
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
