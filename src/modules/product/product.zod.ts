import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    categoryId: z.string().min(1, "Category ID is required"),
    brandId: z.string().min(1, "Brand ID is required"),
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().optional(),
    hasVariants: z.boolean(),
    attributeIds: z.array(z.string()).optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    categoryId: z.string().optional(),
    brandId: z.string().optional(),
    hasVariants: z.boolean().optional(),
    attributeIds: z.array(z.string()).optional(),
  }),
});

export const createVariantSchema = z.object({
  body: z.object({
    sku: z.string().min(1, "SKU is required"),
    purchasePrice: z.number().positive("Purchase price must be positive"),
    salePrice: z.number().positive("Sale price must be positive"),
    images: z.array(z.string()).min(1, "At least one image is required"),
    attributeValues: z.array(
      z.object({
        attributeId: z.string(),
        attributeValueId: z.string(),
      }),
    ),
    isDefault: z.boolean().optional(),
  }),
});

export const bulkCreateVariantsSchema = z.object({
  body: z.object({
    combinations: z.array(
      z.array(
        z.object({
          attributeId: z.string(),
          attributeValueId: z.string(),
        }),
      ),
    ),
    basePrice: z.number().positive(),
    baseSalePrice: z.number().positive(),
  }),
});
