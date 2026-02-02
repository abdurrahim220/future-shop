import { z } from "zod";

export const createSellerWalletZodSchema = z.object({
  body: z.object({
    sellerId: z.string().min(1, { message: "Seller id is required" }),
  }),
});
