import { Schema, model } from "mongoose";
import { IBranchInventory } from "./branchinventory.interface";

const branchinventorySchema = new Schema<IBranchInventory>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: false,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    reorderLevel: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const BranchInventoryModel = model<IBranchInventory>(
  "BranchInventory",
  branchinventorySchema,
);
