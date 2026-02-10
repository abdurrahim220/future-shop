import { z } from "zod";

export const createCategoriesZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateCategoriesZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
