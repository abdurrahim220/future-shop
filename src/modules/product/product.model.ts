import { Schema, model } from "mongoose";
import { IProduct, IProductVariant } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    sellerId: { type: Schema.Types.ObjectId, required: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, required: true },
    brandId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    hasVariants: { type: Boolean, default: false },
    attributeIds: [{ type: Schema.Types.ObjectId }],
    status: {
      type: String,
      enum: ["draft", "pending", "active"],
      default: "draft",
    },
  },
  { timestamps: true },
);

export const ProductModel = model("Product", productSchema);

// ---------------- VARIANT ----------------

const productVariantSchema = new Schema<IProductVariant>(
  {
    productId: { type: Schema.Types.ObjectId, required: true, index: true },
    sku: { type: String, required: true, unique: true },
    purchasePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    images: [{ type: String }],
    attributeValues: [
      {
        attributeId: Schema.Types.ObjectId,
        attributeValueId: Schema.Types.ObjectId,
      },
    ],
    isDefault: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

productVariantSchema.index(
  { productId: 1, "attributeValues.attributeValueId": 1 },
  { unique: true },
);

export const ProductVariantModel = model(
  "ProductVariant",
  productVariantSchema,
);
