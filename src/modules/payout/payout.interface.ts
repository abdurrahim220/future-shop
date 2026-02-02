import { Types } from "mongoose";

export interface IPayout {
  sellerId: Types.ObjectId;
  amount: number;
  status: "pending" | "approved" | "rejected";
  createdAt?: Date;
}
