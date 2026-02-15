import { z } from "zod";

export const createStockMovementZodSchema = z.object({
  body: z.object({
    branchId: z.string(),
    sellerId: z.string(),
    productId: z.string(),
    variantId: z.string(),
    type: z.enum([
      "initial",
      "online_order",
      "pos_sale",
      "return",
      "adjustment",
      "transfer_in",
      "transfer_out",
    ]),
    quantity: z.number(),
    referenceId: z.string(),
  }),
});

export const updateStockMovementZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
