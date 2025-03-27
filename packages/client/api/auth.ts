import axios from "axios";
import { loginInputType } from "@shared/schemas/auth.schema";
import { signIn } from "next-auth/react";
import { IUser } from "@shared/types/user.types";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const auth = axios.create({
  baseURL: `${BASE_URL}/auth`,
  withCredentials: true,
});

export const fetchUser = async (): Promise<IUser> => {
  const response = await auth.get<IUser>("/validate");
  return response.data;
};

export const nextLogin = async (loginData: loginInputType) => {
  const response = await signIn("credentials", {
    ...loginData,
    redirect: false,
  });
  return response;
};
