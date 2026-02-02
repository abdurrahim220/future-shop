import { z } from "zod";

export const createSellerZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateSellerZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
