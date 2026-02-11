import { Types } from "mongoose";

export interface IAttributeValuePair {
  attributeId: Types.ObjectId;
  attributeValueId: Types.ObjectId;
}

export interface IProduct {
  sellerId: Types.ObjectId;
  categoryId: Types.ObjectId;
  brandId: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  hasVariants: boolean;
  attributeIds: Types.ObjectId[];
  status: "draft" | "pending" | "active";
}

export interface IProductVariant {
  productId: Types.ObjectId;
  sku: string;
  purchasePrice: number;
  salePrice: number;
  images: string[];
  attributeValues: IAttributeValuePair[];
  isDefault: boolean;
  status: "active" | "inactive";
}
