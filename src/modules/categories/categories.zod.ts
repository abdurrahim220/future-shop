import { z } from "zod";

export const createCategoriesZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    icon: z.string().optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
    parentId: z.string().optional(),
  }),
});

export const updateCategoriesZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
    parentId: z.string().optional(),
  }),
});

export const categoriesQueryZodSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    isActive: z.enum(["true", "false"]).optional(),
    isFeatured: z.enum(["true", "false"]).optional(),
    limit: z.string().optional(),
    page: z.string().optional(),
    sort: z.string().optional(),
  }),
});
