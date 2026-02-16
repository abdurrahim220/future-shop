import { Schema, model } from "mongoose";
import { IStockTransfer, IStockTransferItem } from "./stocktransfer.interface";
import { stockTransferStatusEnum } from "../../interface/enums";

const stockTransferItemSchema = new Schema<IStockTransferItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const stocktransferSchema = new Schema<IStockTransfer>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    fromBranchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    toBranchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    items: {
      type: [stockTransferItemSchema],
      required: true,
    },
    status: {
      type: String,
      enum: stockTransferStatusEnum,
      default: stockTransferStatusEnum.pending,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const StockTransferModel = model<IStockTransfer>(
  "StockTransfer",
  stocktransferSchema,
);
