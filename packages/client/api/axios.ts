import axios from "axios";

const orginURL = process.env.NEXT_PUBLIC_API_HOST;

export const api = axios.create({
  baseURL: orginURL,
});
