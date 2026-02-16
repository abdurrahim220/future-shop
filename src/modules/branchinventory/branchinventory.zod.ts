import { z } from "zod";

export const createBranchInventoryZodSchema = z.object({
  body: z.object({
    sellerId: z.string().optional(),
    branchId: z.string().optional(),
    productId: z.string().optional(),
    variantId: z.string().optional(),
    stock: z.number().optional(),
    reorderLevel: z.number().optional(),
  }),
});

export const updateBranchInventoryZodSchema = z.object({
  body: z.object({
    sellerId: z.string().optional(),
    branchId: z.string().optional(),
    productId: z.string().optional(),
    variantId: z.string().optional(),
    stock: z.number().optional(),
    reorderLevel: z.number().optional(),
  }),
});
