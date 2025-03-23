import { FieldErrors } from "react-hook-form";

/**
 * Extracts the first error message from form errors.
 * @param errors - The form errors object from react-hook-form.
 * @returns The first error message found, or undefined if no errors exist.
 */
export const getFormError = (errors: FieldErrors): string | undefined => {
  if (errors.root?.message) return errors.root.message;

  const fields = ["displayName", "email", "password", "confirmPassword"];
  const errorMessage = fields
    .map((field) => errors[field]?.message)
    .find((message) => message);

  return typeof errorMessage === "string" ? errorMessage : undefined;
};
