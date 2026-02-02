import { Schema, model } from "mongoose";
import { IBranches } from "./branches.interface";

const branchesSchema = new Schema<IBranches>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    branchName: {
      type: String,
      required: true,
      trim: true,
    },

    branchCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    type: {
      type: String,
      enum: ["store", "warehouse"],
      required: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

// Optional but smart: branchCode unique per seller
branchesSchema.index({ sellerId: 1, branchCode: 1 }, { unique: true });

export const BranchesModel = model<IBranches>("Branches", branchesSchema);
