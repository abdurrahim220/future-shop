import { z } from "zod";

export const createStockTransferZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updateStockTransferZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
