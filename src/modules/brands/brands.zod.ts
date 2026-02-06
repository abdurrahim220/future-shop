import { z } from "zod";

export const createBrandsZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const brandSearchZodSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform(Number)
      .refine((v) => !v || v > 0),

    limit: z
      .string()
      .optional()
      .transform(Number)
      .refine((v) => !v || v > 0),

    search: z.string().optional(),

    isActive: z
      .string()
      .optional()
      .transform((v) => v === "true"),
  }),
});

export const updateBrandsZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
