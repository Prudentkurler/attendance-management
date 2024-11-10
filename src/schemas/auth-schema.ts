import { z } from "zod";

// log in
export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email",
  }),

  password: z.string().min(8, "Password must be 8 or more characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const initialLoginValues: LoginSchema = {
  email: "",
  password: "",
};

// reset password
const restePasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email",
  }),
});

export type ResetPasswordSchema = z.infer<typeof restePasswordSchema>;

export const initialForgotPasswordValues: ResetPasswordSchema = {
  email: "",
};
