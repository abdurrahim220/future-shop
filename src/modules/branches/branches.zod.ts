import { z } from "zod";

export const createBranchesZodSchema = z.object({
  body: z.object({
    sellerId: z.string().min(1, { message: "Seller id is required" }),

    branchName: z.string().min(2, { message: "Branch name is required" }),

    branchCode: z.string().min(2, { message: "Branch code is required" }),

    type: z.enum(["store", "warehouse"], {
      message: "Invalid branch type",
    }),

    phone: z.string().min(10, { message: "Phone number is required" }),

    address: z.string().min(5, { message: "Address is required" }),

    city: z.string().min(2, { message: "City is required" }),

    state: z.string().min(2, { message: "State is required" }),
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
