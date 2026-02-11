import { z } from "zod";

export const createAttributeZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateAttributeZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
