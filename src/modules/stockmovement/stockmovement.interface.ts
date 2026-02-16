import { Types } from "mongoose";
import { stockMovementEnum } from "../../interface/enums";

export interface IStockMovement {
  _id: string;
  branchId: Types.ObjectId;
  sellerId: Types.ObjectId;
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  type: stockMovementEnum;
  quantity: number;
  referenceId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
