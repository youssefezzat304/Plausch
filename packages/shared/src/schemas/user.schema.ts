import { object, string, TypeOf, literal, array, boolean, date } from "zod";

export const userSchema = object({
  displayName: string()
    .min(3, "Display name should be at least 3 characters.")
    .max(32, "Display name should be no more than 32 characters.")
    .default("User"),
  email: string().email("Invalid email format.").optional(),

  password: string().min(6, "Password must be at least 6 characters."),

  profilePicture: string().optional().or(literal("")),

  friends: array(string()).optional().default([]),

  phoneNumber: string()
    .max(25, "Phone number should be no more than 25 characters.")
    .optional()
    .default("")
    .or(literal("")),

  birthDate: string().optional().or(literal("")),

  onlineStatus: boolean().default(false),

  lastSeen: date().default(() => new Date()),

  bio: string()
    .max(250, "Bio should be no more than 250 characters.")
    .optional()
    .default("Hey there I am using chat app...")
    .or(literal("")),

  address: object({
    country: string().min(2).optional().or(literal("")),
    city: string().min(2).optional().or(literal("")),
    postalCode: string().min(1).optional().or(literal("")),
  }).optional(),
}).partial();

export type UserInputType = TypeOf<typeof userSchema>;
