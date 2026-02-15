import { Types } from "mongoose";

export interface IBranchInventory {
  _id: string;
  branchId: Types.ObjectId;
  sellerId: Types.ObjectId;
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  stock: number;
  reorderLevel: number;
  createdAt?: Date;
  updatedAt?: Date;
}
