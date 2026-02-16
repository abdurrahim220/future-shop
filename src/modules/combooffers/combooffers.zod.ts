import { z } from "zod";

export const createComboOffersZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateComboOffersZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});