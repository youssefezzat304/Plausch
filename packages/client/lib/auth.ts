import { auth } from "@/api/auth";

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
