import { Schema, model, Types } from "mongoose";
import { IComboOffers } from "./combooffers.interface";
import { mainStatusEnum } from "../../interface/enums";

const combooffersSchema = new Schema<IComboOffers>(
  {
    title: {
      type: String,
      required: true,
    },
    discountType: {
      type: String,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantityRequired: {
          type: Number,
          required: true,
        },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(mainStatusEnum),
      default: mainStatusEnum.active,
    },
  },
  { timestamps: true },
);

export const ComboOffersModel = model<IComboOffers>(
  "ComboOffers",
  combooffersSchema,
);
