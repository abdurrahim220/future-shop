import { z } from "zod";

export const createNotificationsZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateNotificationsZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});