import { Chat } from "@/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getChats = async (userId: string): Promise<Chat[]> => {
  const response = await api.get<Chat[]>(`/${userId}/chats`);
  return response.data;
};
