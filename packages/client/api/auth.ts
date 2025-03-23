import axios from "axios";
import { User } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const auth = axios.create({
  baseURL: `${BASE_URL}/auth`,
  withCredentials: true,
});

export const fetchUser = async (): Promise<User> => {
  const response = await auth.get<User>("/validate");
  return response.data;
};
