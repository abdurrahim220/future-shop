import { z } from "zod";

export const createWishlistZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateWishlistZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
