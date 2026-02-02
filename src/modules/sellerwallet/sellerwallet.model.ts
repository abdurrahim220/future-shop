import { Schema, model } from "mongoose";
import { ISellerWallet } from "./sellerwallet.interface";

const sellerWalletSchema = new Schema<ISellerWallet>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      unique: true, // one wallet per seller
      index: true,
    },

    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SellerWalletModel = model<ISellerWallet>(
  "SellerWallet",
  sellerWalletSchema,
);
