import { Schema, model } from "mongoose";
import { IStockMovement } from "./stockmovement.interface";

const stockmovementSchema = new Schema<IStockMovement>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const StockMovementModel = model<IStockMovement>(
  "StockMovement",
  stockmovementSchema,
);
