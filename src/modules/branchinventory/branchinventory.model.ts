import { Schema, model } from "mongoose";
import { IBranchInventory } from "./branchinventory.interface";

const branchinventorySchema = new Schema<IBranchInventory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const BranchInventoryModel = model<IBranchInventory>(
  "BranchInventory",
  branchinventorySchema,
);
