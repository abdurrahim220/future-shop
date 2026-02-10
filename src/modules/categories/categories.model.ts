import { Schema, model } from "mongoose";
import { ICategories } from "./categories.interface";
import { imageSchema } from "../../interface/imageSchema";
import generateSlug from "../../utils/generateSlug";

const categoriesSchema = new Schema<ICategories>(
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
      index: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
    icon: {
      type: imageSchema,
    },
    public_id: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

categoriesSchema.index({ name: "text" });
categoriesSchema.index({ slug: "text" });

categoriesSchema.index({ isActive: 1 });
categoriesSchema.index({ isFeatured: 1 });

categoriesSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = generateSlug(this.name);
  }
});
export const CategoriesModel = model<ICategories>(
  "Categories",
  categoriesSchema,
);
