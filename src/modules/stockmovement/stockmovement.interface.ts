import { Types } from "mongoose";

export interface IStockMovement {
  _id: string;
  branchId: Types.ObjectId;
  sellerId: Types.ObjectId;
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  type:
    | "initial"
    | "online_order"
    | "pos_sale"
    | "return"
    | "adjustment"
    | "transfer_in"
    | "transfer_out";
  quantity: number;
  referenceId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
