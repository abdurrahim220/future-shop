import { Types } from "mongoose";

interface IStockTransferItem {
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  quantity: number;
}

export interface IStockTransfer {
  _id: string;
  sellerId: Types.ObjectId;
  fromBranchId: Types.ObjectId;
  toBranchId: Types.ObjectId;
  status: "pending" | "completed";
  items: IStockTransferItem[];
  createdAt: Date;
  updatedAt: Date;
}
