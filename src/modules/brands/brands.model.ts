import { Schema, model } from "mongoose";
import { IBrands } from "./brands.interface";
import generateSlug from "../../utils/generateSlug";
import { imageSchema } from "../../interface/imageSchema";

const brandsSchema = new Schema<IBrands>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      index: true,
    },
    logo: {
      type: imageSchema,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

brandsSchema.index({ name: "text" });

brandsSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = generateSlug(this.name);
  }
});

export const BrandsModel = model<IBrands>("Brands", brandsSchema);
