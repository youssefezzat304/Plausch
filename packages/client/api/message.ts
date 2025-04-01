import { Message } from "@shared/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const message = axios.create({
  baseURL: `${BASE_URL}/message`,
  withCredentials: true,
});

export const getMessages = async (
  conversationId: string,
): Promise<Message[]> => {
  const response = await message.get<Message[]>(`/${conversationId}`);
  return response.data;
};
