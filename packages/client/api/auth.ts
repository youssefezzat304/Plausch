import axios from "axios";

const AuthURL = process.env.NEXT_PUBLIC_API_AUTH;

export const auth = axios.create({
  baseURL: AuthURL,
});

export const signup = async () => {};
