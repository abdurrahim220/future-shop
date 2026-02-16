import { Types } from "mongoose";

export interface ISubOrder {
  _id: string;
  orderId: Types.ObjectId;
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  sellerId: Types.ObjectId;
  branchId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
