import { PrivateChat } from "@shared/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getPrivateChats = async (
  userId: string,
): Promise<PrivateChat[]> => {
  const response = await api.get<PrivateChat[]>(`/${userId}/privateChats`);
  return response.data;
};
