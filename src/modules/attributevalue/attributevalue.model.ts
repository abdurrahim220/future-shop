import { Schema, model } from "mongoose";
import { IAttributeValue } from "./attributevalue.interface";

const attributevalueSchema = new Schema<IAttributeValue>(
  {
    attributeId: {
      type: Schema.Types.ObjectId,
      ref: "Attribute",
      required: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    hexCode: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const AttributeValueModel = model<IAttributeValue>(
  "AttributeValue",
  attributevalueSchema,
);
