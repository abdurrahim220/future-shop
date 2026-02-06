import { z } from "zod";

export const createNotificationsZodSchema = z.object({
  body: z.object({
    type: z.string().min(2),
    referenceId: z.string().min(2),
    message: z.string().min(2),
  }),
});
