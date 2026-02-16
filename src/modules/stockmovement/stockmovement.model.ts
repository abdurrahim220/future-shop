import { Schema, model } from "mongoose";
import { IStockMovement } from "./stockmovement.interface";
import { stockMovementEnum } from "../../interface/enums";

const stockmovementSchema = new Schema<IStockMovement>(
  {
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
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
    type: {
      type: String,
      enum: stockMovementEnum,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    referenceId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const StockMovementModel = model<IStockMovement>(
  "StockMovement",
  stockmovementSchema,
);
