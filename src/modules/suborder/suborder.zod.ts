import { z } from "zod";

export const createSubOrderZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateSubOrderZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
