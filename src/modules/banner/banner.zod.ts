import { z } from "zod";

export const createBannerZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateBannerZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});