import { z } from "zod";

export const createCampaignZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateCampaignZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
