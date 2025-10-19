import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  phone: z
  .string()
  .min(10)
  .max(15)
  .regex(/^\d+$/, "O telefone deve conter apenas números"),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
