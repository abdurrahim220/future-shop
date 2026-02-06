import { Query, Schema, model } from "mongoose";
import { IBrands } from "./brands.interface";
import generateSlug from "../../utils/generateSlug";

const imageSchema = {
  small: { type: String },
  medium: { type: String },
  large: { type: String },
  original: { type: String },
};

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
brandsSchema.index({ isActive: 1 });

brandsSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = generateSlug(this.name);
  }
});

brandsSchema.pre<Query<IBrands | null, IBrands>>(
  "findOneAndUpdate",
  function () {
    const update = this.getUpdate();

    if (!update || typeof update !== "object") return;

    const updateObj = update as {
      name?: string;
      $set?: { name?: string; slug?: string };
      slug?: string;
    };

    const name = updateObj.name ?? updateObj.$set?.name;

    if (!name) return;

    const slug = generateSlug(name);

    if (updateObj.$set) {
      updateObj.$set.slug = slug;
    } else {
      updateObj.slug = slug;
    }
  },
);

export const BrandsModel = model<IBrands>("Brands", brandsSchema);
