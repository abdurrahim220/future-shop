import { Schema, model } from "mongoose";
import { ISubOrder } from "./suborder.interface";

const suborderSchema = new Schema<ISubOrder>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const SubOrderModel = model<ISubOrder>("SubOrder", suborderSchema);
