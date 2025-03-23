import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const chats = axios.create({
  baseURL: `${BASE_URL}/chats`,
  withCredentials: true,
});
