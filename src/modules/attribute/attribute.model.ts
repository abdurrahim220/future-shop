import { Schema, model } from "mongoose";
import { IAttribute } from "./attribute.interface";
import generateSlug from "../../utils/generateSlug";

const attributeSchema = new Schema<IAttribute>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: false,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["image", "text", "number"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

attributeSchema.index({ name: 1 });
attributeSchema.index({ slug: 1 });
attributeSchema.index({ type: 1 });

attributeSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = generateSlug(this.name);
  }
});

export const AttributeModel = model<IAttribute>("Attribute", attributeSchema);
