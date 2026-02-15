import { z } from "zod";

export const createBranchInventoryZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateBranchInventoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
