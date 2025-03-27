import { auth } from "@/api/auth";
import { getSession, signOut } from "next-auth/react";

export const login = async (
  credentials: Record<"email" | "password", string> | undefined,
) => {
  try {
    const response = await auth.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
