import { z } from "zod";

export const createBranchesZodSchema = z.object({
  body: z.object({
    sellerId: z.string().min(1, { message: "Seller / Shop is required" }),

    branchName: z.string().min(2, { message: "Branch name must be at least 2 characters" }),

    branchCode: z.string().min(2, { message: "Branch code must be at least 2 characters" }),

    type: z.enum(["store", "warehouse"], {
      message: "Invalid branch type",
    }),

    phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),

    address: z.string().min(5, { message: "Address must be at least 5 characters" }),

    city: z.string().min(2, { message: "City must be at least 2 characters" }),

    state: z.string().min(2, { message: "State must be at least 2 characters" }),
  }),
});

export const updateBranchesZodSchema = z.object({
  body: z.object({
    branchName: z.string().min(2).optional(),

    branchCode: z.string().min(2).optional(),

    type: z.enum(["store", "warehouse"]).optional(),

    phone: z.string().min(10).optional(),

    address: z.string().min(5).optional(),

    city: z.string().min(2).optional(),

    state: z.string().min(2).optional(),

    status: z.enum(["active", "inactive"]).optional(),
  }),
});
