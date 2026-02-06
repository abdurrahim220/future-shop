import { z } from "zod";

export const createBrandsZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateBrandsZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
