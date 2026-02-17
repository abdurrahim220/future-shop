import { z } from "zod";

export const createReviewsZodSchema = z.object({
  body: z.object({
    productId: z.string().min(2),
    userId: z.string().min(2),
    rating: z.number().min(1).max(5),
    comment: z.string().min(2),
    images: z.array(z.string()).optional(),
    public_id: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const updateReviewsZodSchema = z.object({
  body: z.object({
    productId: z.string().optional(),
    userId: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
    images: z.array(z.string()).optional(),
    public_id: z.string().optional(),
    status: z.string().optional(),
  }),
});
