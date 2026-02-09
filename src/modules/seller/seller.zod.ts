import { z } from "zod";

export const createSellerZodSchema = z.object({
  body: z.object({
    shopName: z.string().min(2, { message: "Shop name is required" }),
  }),
});

export const updateSellerZodSchema = z.object({
  body: z.object({
    shopName: z.string().min(2).optional(),
    status: z.enum(["pending", "approved", "rejected", "suspended"]).optional(),
  }),
});

export const sellerZodQuery = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform(Number)
      .refine((v) => !v || v > 0),

    limit: z
      .string()
      .optional()
      .transform(Number)
      .refine((v) => !v || v > 0),
    search: z.string().optional(),
    status: z.enum(["pending", "approved", "rejected", "suspended"]).optional(),
  }),
});
