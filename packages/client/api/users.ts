import { IUser } from "@shared/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const users = axios.create({
  baseURL: `${BASE_URL}/users`,
  withCredentials: true,
});

export const getUser = async (userId: string) => {
  const response = await users.get<IUser>(`/${userId}`);
  return response.data;
};
