import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    categoryId: z.string(),
    brandId: z.string(),
    name: z.string().min(3),
    description: z.string().optional(),
    hasVariants: z.boolean(),
    attributeIds: z.array(z.string()).optional(),
  }),
});

export const createVariantSchema = z.object({
  body: z.object({
    sku: z.string(),
    purchasePrice: z.number().positive(),
    salePrice: z.number().positive(),
    images: z.array(z.string()).min(1),
    attributeValues: z.array(
      z.object({
        attributeId: z.string(),
        attributeValueId: z.string(),
      }),
    ),
    isDefault: z.boolean().optional(),
  }),
});
