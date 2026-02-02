import { z } from "zod";

export const createPayoutZodSchema = z.object({
  body: z.object({
    sellerId: z.string().min(1, { message: "Seller id is required" }),
    amount: z.number().min(1, { message: "Amount must be greater than 0" }),
  }),
});

export const updatePayoutZodSchema = z.object({
  body: z.object({
    status: z.enum(["approved", "rejected"]),
  }),
});
