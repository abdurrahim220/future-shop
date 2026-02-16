import { Types } from "mongoose";

export interface IWishlist {
  _id: string;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
