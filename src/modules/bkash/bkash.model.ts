import { Schema, model } from "mongoose";
import { IBkashToken } from "./bkash.interface";

const bkashTokenSchema = new Schema<IBkashToken>(
  {
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const BkashTokenModel = model<IBkashToken>(
  "BkashToken",
  bkashTokenSchema,
);
