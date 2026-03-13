import z from "zod";

export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(30),
  name: z.string(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(30),
});
