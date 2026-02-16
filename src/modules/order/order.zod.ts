import { z } from "zod";

export const createOrderZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateOrderZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
