import { object, string, TypeOf } from "zod";
import { ErrorMessage } from "../exceptions";

export const signupSchema = object({
  displayName: string()
    .min(3, "Display name should be mininum of 3 characters.")
    .max(32, "Display name should be no more than of 32 characters."),
  email: string()
    .min(1, "Email is required.")
    .email("This is not a valid E-mail."),
  password: string()
    .min(1, "Password is required.")
    .min(6, "Password should be min of 6 chars."),
  confirmPassword: string().min(1, "Password confirmation is required."),
}).refine((data) => data.password === data.confirmPassword, {
  message: ErrorMessage.PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});

export const loginSchema = object({
  email: string()
    .min(1, "Email is required.")
    .email("This is not a valid E-mail."),
  password: string()
    .min(1, "Password is required.")
    .min(6, "Password should be min of 6 chars."),
});

export type signupInputType = TypeOf<typeof signupSchema>;
export type loginInputType = TypeOf<typeof loginSchema>;
