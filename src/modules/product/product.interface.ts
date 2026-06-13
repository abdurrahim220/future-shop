import { Types } from "mongoose";
import { RawCombination } from "./product.variant.generator";

export interface IAttributeValuePair {
  attributeId: Types.ObjectId;
  attributeValueId: Types.ObjectId;
}

export interface IProduct {
  sellerId: Types.ObjectId;
  categoryId: Types.ObjectId;
  brandId: Types.ObjectId;
  name: string;
  sku: string;
  slug: string;
  description?: string;
  hasVariants: boolean;
  attributeIds: Types.ObjectId[];
  status: "draft" | "pending" | "active";
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IProductVariant {
  productId: Types.ObjectId;
  sku: string;
  purchasePrice: number;
  salePrice: number;
  images: string[];
  attributeValues: IAttributeValuePair[];
  isDefault: boolean;
  variantKey: string;
  status: "active" | "inactive";
}

export interface CreateProductPayload {
  categoryId: string;
  brandId: string;
  name: string;
  description?: string;
  hasVariants: boolean;
  attributeIds?: string[];
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  categoryId?: string;
  brandId?: string;
  hasVariants?: boolean;
  attributeIds?: string[];
}

export interface CreateVariantPayload {
  sku: string;
  purchasePrice: number;
  salePrice: number;
  images: string[];
  attributeValues: {
    attributeId: string;
    attributeValueId: string;
  }[];
  isDefault?: boolean;
}

export interface BulkVariantCreationPayload {
  combinations: RawCombination[][];
  basePrice: number;
  baseSalePrice: number;
}
