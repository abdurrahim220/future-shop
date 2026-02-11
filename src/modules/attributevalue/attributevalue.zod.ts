import { z } from "zod";

export const createAttributeValueZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateAttributeValueZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
