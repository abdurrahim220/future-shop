import { z } from "zod";

const changeUserRoleZodSchema = z.object({
  body: z.object({
    userId: z.string({ message: "User ID is required" }),
    role: z.enum(["admin", "customer", "seller"], { message: "Invalid role" }),
    sellerRequest: z
      .enum(["pending", "approved", "rejected", "not_requested"], {
        message: "Invalid seller request",
      })
      .optional(),
  }),
});

const getAllUsersSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform(Number)
      .refine((v) => !v || v > 0),

    limit: z
      .string()
      .optional()
      .transform(Number)
      .refine((v) => !v || v > 0),

    search: z.string().optional(),

    role: z.enum(["admin", "customer", "seller"]).optional(),

    isActive: z
      .string()
      .optional()
      .transform((v) => v === "true"),
  }),
});

export const AdminValidation = {
  changeUserRoleZodSchema,
  getAllUsersSchema,
};
