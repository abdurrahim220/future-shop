import z from "zod";

const loginZodSchema = z.object({
  body: z.object({
    email: z.email().optional(),
    phone: z.string().optional(),
    password: z.string().min(6),
  }),
});

export const authZodSchema = {
  loginZodSchema,
};
