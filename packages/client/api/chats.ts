import { PrivateChat } from "@/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const chatsAPI = axios.create({
  baseURL: `${BASE_URL}/privateChat`,
  withCredentials: true,
});

export const getChat = async (chatId: string) => {
  const response = await chatsAPI.get<PrivateChat>(`/${chatId}`);
  return response.data;
};
