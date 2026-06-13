import { Schema, model } from "mongoose";
import { IBanner } from "./banner.interface";
import { imageSchema } from "../../interface/imageSchema";

const bannerSchema = new Schema<IBanner>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: imageSchema,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const BannerModel = model<IBanner>("Banner", bannerSchema);