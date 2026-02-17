import { Schema, model } from "mongoose";
import { IReviews } from "./reviews.interface";
import { imageSchema } from "../../interface/imageSchema";

const reviewsSchema = new Schema<IReviews>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    images: [
      {
        type: imageSchema,
        required: true,
      },
    ],
    public_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const ReviewsModel = model<IReviews>("Reviews", reviewsSchema);
