import { object, string, TypeOf, array, boolean, date } from "zod";

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

  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password must be at most 64 characters"),

  profilePicture: string()
    .url("Invalid URL format")
    .optional()
    .default("https://github.com/shadcn.png"),

  chats: array(string().regex(ObjectIdRegex)).default([]),

  sentRequests: array(string().regex(ObjectIdRegex)).default([]),

  friendRequests: array(string().regex(ObjectIdRegex)).default([]),

  contacts: array(string().regex(ObjectIdRegex)).default([]),

  phoneNumber: string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid E.164 phone number format")
    .optional()
    .default(""),

  birthDate: string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format")
    .optional(),

  onlineStatus: boolean().default(false),
  lastSeen: date().default(() => new Date()),

  bio: string()
    .max(250, "Bio must be at most 250 characters")
    .default("Hey there I am using chat app..."),

  address: object({
    country: string()
      .min(2, "Country must be at least 2 characters")
      .optional(),
    city: string().min(2, "City must be at least 2 characters").optional(),
    postalCode: string()
      .min(3, "Postal code must be at least 3 characters")
      .optional(),
  }).optional(),
}).strict();

export type UserInputType = TypeOf<typeof userSchema>;
