import { z } from "zod";

export const createCuponsZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateCuponsZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
