import { z } from "zod";

export const createAddressZodSchema = z.object({
  body: z.object({
    userId: z.string().min(1, {
      message: "User id is required",
    }),

    division: z.string().min(2, {
      message: "Division is required",
    }),

    district: z.string().min(2, {
      message: "District is required",
    }),

    upazilla: z.string().min(2, {
      message: "Upazilla is required",
    }),

    village: z.string().min(2, {
      message: "Village is required",
    }),

    phone: z.string().min(10, {
      message: "Phone number must be at least 10 digits",
    }),

    email: z.string().email({
      message: "Invalid email format",
    }),

    isDefault: z.boolean().optional(),
  }),
});

export const updateAddressZodSchema = z.object({
  body: z.object({
    division: z
      .string()
      .min(2, {
        message: "Division is required",
      })
      .optional(),
    district: z
      .string()
      .min(2, {
        message: "District is required",
      })
      .optional(),
    upazilla: z
      .string()
      .min(2, {
        message: "Upazilla is required",
      })
      .optional(),
    village: z
      .string()
      .min(2, {
        message: "Village is required",
      })
      .optional(),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 digits",
      })
      .optional(),
    email: z
      .string()
      .email({
        message: "Invalid email format",
      })
      .optional(),
    isDefault: z.boolean().optional(),
  }),
});
