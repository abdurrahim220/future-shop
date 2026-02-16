import { z } from "zod";

export const createCartZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateCartZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
