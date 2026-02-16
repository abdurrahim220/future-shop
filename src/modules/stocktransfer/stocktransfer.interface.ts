import { Types } from "mongoose";
import { stockTransferStatusEnum } from "../../interface/enums";

export interface IStockTransferItem {
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  quantity: number;
}

export interface IStockTransfer {
  _id: string;
  sellerId: Types.ObjectId;
  fromBranchId: Types.ObjectId;
  toBranchId: Types.ObjectId;
  status: stockTransferStatusEnum;
  items: IStockTransferItem[];
  createdAt: Date;
  updatedAt: Date;
}
