import { Types } from "mongoose";

export interface ISellerWallet {
  sellerId: Types.ObjectId;
  balance: number;
  updatedAt?: Date;
}
