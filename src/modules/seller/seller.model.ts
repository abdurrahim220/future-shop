import { Schema, model } from "mongoose";
import { ISeller } from "./seller.interface";

const imageSchema = {
  small: { type: String },
  medium: { type: String },
  large: { type: String },
  original: { type: String },
};

const sellerSchema = new Schema<ISeller>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one seller per user
      index: true,
    },

    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    logo: imageSchema,
    banner: imageSchema,
    logoPublicId: {
      type: String,
    },
    bannerPublicId: {
      type: String,
    },

    tradeLicense: imageSchema,
    tradeLicensePublicId: {
      type: String,
    },

    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: false,
    },

    commissionPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export const SellerModel = model<ISeller>("Seller", sellerSchema);
