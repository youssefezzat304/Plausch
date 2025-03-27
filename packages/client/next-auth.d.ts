import NextAuth from "next-auth";
import { IUser } from "@shared/types/user.types";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
