import { Schema, model } from "mongoose";
import { ICampaign } from "./campaign.interface";
import { imageSchema } from "../../interface/imageSchema";
import { mainStatusEnum } from "../../interface/enums";
import generateSlug from "../../utils/generateSlug";

const campaignSchema = new Schema<ICampaign>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    bannerImg: {
      type: imageSchema,
      required: true,
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
    },
    brands: {
      type: [Schema.Types.ObjectId],
      ref: "Brand",
    },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    endDate: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: mainStatusEnum,
      default: mainStatusEnum.pending,
    },
  },
  { timestamps: true },
);

campaignSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
});

campaignSchema.index({ title: "text" });
campaignSchema.index({ status: 1 });
campaignSchema.index({ startDate: 1 });
campaignSchema.index({ endDate: 1 });

export const CampaignModel = model<ICampaign>("Campaign", campaignSchema);
