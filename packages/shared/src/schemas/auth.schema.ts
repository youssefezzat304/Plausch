import { object, string, TypeOf } from "zod";
import { ErrorMessage } from "../exceptions/exceptions";

export const signupSchema = object({
  email: string({
    required_error: "Email is required,",
  }).email("This is not a valid E-mail."),
  password: string({
    required_error: "Password is required,",
  }).min(6, "Password should be min of 6 chars."),
  confirmPassword: string({
    required_error: "Password confirmation is required,",
  }),
  displayName: string()
    .min(3, "Display name should be mininum of 3 characters.")
    .max(32, "Display name should be no more than of 32 characters."),
}).refine((data) => data.password === data.confirmPassword, {
  message: ErrorMessage.PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});

export const loginSchema = object({
  email: string({ required_error: "Email is required," }).email(
    "This is not a valid E-mail.",
  ),
  password: string({ required_error: "Password is required." }),
});

export type signupInputType = TypeOf<typeof signupSchema>;
export type lognInputType = TypeOf<typeof loginSchema>;
