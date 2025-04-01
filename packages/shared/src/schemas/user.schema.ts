import { object, string, TypeOf, array, boolean, date, z } from "zod";

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

export const userSchema = object({
  displayName: string()
    .min(3, "Display name must be at least 3 characters")
    .max(32, "Display name must be at most 32 characters")
    .default("User"),

  email: string()
    .email("Invalid email format")
    .regex(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email structure",
    )
    .transform((val) => val.toLowerCase()),

  // profilePicture: string()
  //   .url("Invalid URL format.")
  //   .optional()
  //   .default("https://github.com/shadcn.png"),

  phoneNumber: string()
    .regex(/^[0-9]*$/, "Phone number can only contain numbers") // Allow empty
    .transform((val) => val || undefined) // Convert empty to undefined
    .optional(),

  birthDate: string()
    .regex(/^(\d{2}-\d{2}-\d{4})?$/, "Use DD-MM-YYYY format or leave empty")
    .transform((val) => val || undefined)
    .optional(),

  address: object({
    country: string()
      .min(0)
      .transform((val) => val || undefined)
      .optional(),
    city: string()
      .min(0)
      .transform((val) => val || undefined)
      .optional(),
    postalCode: string()
      .min(0)
      .transform((val) => val || undefined)
      .optional(),
  }).optional(),

  bio: string()
    .max(250, "Bio must be at most 250 characters.")
    .default("Hey there I am using chat app..."),
}).strict();

export type UserInputType = TypeOf<typeof userSchema>;
