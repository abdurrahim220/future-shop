import { z } from "zod";

// ── Create User Schema (mostly for registration)
export const createUserZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, { message: "Name is required & must be at least 2 characters" }),

    email: z.email({ message: "Enter a valid email" }),

    phone: z
      .string()
      .min(10, { message: "Phone number is required" })
      .max(15, { message: "Phone number is too long" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),

    role: z
      .enum(["admin", "seller", "customer"], {
        message: "Role must be one of: admin, seller, customer",
      })
      .default("customer")
      .optional(),

    status: z
      .enum(["active", "blocked"], {
        message: "Status must be active or blocked",
      })
      .default("active")
      .optional(), // normally not sent during registration
  }),
});

// ── Update User Schema (more flexible — many fields optional)
export const updateUserZodSchema = z.object({
  body: z
    .object({
      name: z.string().min(2).optional(),
      email: z.email().optional(),
      phone: z.string().min(10).max(15).optional(),
      password: z.string().min(6).optional(),
      role: z.enum(["admin", "seller", "customer"]).optional(),
      status: z.enum(["active", "blocked"]).optional(),
    })
    .strict(),
});

// ── Login Schema
export const loginUserZodSchema = z.object({
  body: z.object({
    email: z.email({ message: "Valid email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  }),
});

// ── Optional: Change Password Schema
export const changePasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
  }),
});

const verifyUserOtpZodSchema = z.object({
  body: z.object({
    otp: z.number({ message: "Enter a valid OTP" }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  loginUserZodSchema,
  changePasswordZodSchema,
  verifyUserOtpZodSchema,
};
