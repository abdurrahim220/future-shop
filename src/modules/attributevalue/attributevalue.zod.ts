import { z } from "zod";

export const createAttributeValueZodSchema = z.object({
  body: z.object({
    attributeId: z.string().min(1, "attributeId is required"),
    value: z.string().min(1, "Value is required"),
    hexCode: z.string().optional(),
    sortOrder: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateAttributeValueZodSchema = z.object({
  body: z.object({
    attributeId: z.string().optional(),
    value: z.string().optional(),
    hexCode: z.string().optional(),
    sortOrder: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});
