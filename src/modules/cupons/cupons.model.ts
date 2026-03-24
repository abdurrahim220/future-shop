import { Schema, model } from "mongoose";
import { ICupons } from "./cupons.interface";
import { mainStatusEnum } from "../../interface/enums";

const cuponsSchema = new Schema<ICupons>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    discountType: {
      type: String,
      required: true,
      trim: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    maxDiscount: {
      type: Number,
      required: true,
    },
    minPurchaseAmount: {
      type: Number,
      required: true,
    },
    usageLimit: {
      type: Number,
      required: true,
    },
    usedCount: {
      type: Number,
      required: true,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: mainStatusEnum,
      default: mainStatusEnum.pending,
    },
  },
  { timestamps: true },
);

export const CuponsModel = model<ICupons>("Cupons", cuponsSchema);
