import { Schema, model } from "mongoose";
import { IStockTransfer } from "./stocktransfer.interface";

const stocktransferSchema = new Schema<IStockTransfer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const StockTransferModel = model<IStockTransfer>(
  "StockTransfer",
  stocktransferSchema,
);
