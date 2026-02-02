import { z } from "zod";

export const createSellerZodSchema = z.object({
  body: z.object({
    userId: z.string().min(1, { message: "User id is required" }),

    shopName: z.string().min(2, { message: "Shop name is required" }),

    address: z.string().min(5, { message: "Address is required" }),

    commissionPercentage: z
      .number()
      .min(0, { message: "Commission cannot be negative" })
      .max(100, { message: "Commission cannot exceed 100%" }),
  }),
});

export const updateSellerZodSchema = z.object({
  body: z.object({
    shopName: z.string().min(2).optional(),

    address: z.string().min(5).optional(),

    commissionPercentage: z.number().min(0).max(100).optional(),

    status: z.enum(["pending", "approved", "rejected", "suspended"]).optional(),
  }),
});
