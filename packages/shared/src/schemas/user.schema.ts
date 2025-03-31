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

  // password: string()
  //   .min(6, "Password must be at least 6 characters.")
  //   .max(64, "Password must be at most 64 characters."),

  // profilePicture: string()
  //   .url("Invalid URL format.")
  //   .optional()
  //   .default("https://github.com/shadcn.png"),

  // chats: array(string().regex(ObjectIdRegex)).default([]),

  // sentRequests: array(string().regex(ObjectIdRegex)).default([]),

  // friendRequests: array(string().regex(ObjectIdRegex)).default([]),

  // contacts: array(string().regex(ObjectIdRegex)).default([]),

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
