import { Schema, model } from "mongoose";
import { IPayout } from "./payout.interface";

const payoutSchema = new Schema<IPayout>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const PayoutModel = model<IPayout>("Payout", payoutSchema);
