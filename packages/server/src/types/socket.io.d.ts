import { Socket } from "socket.io";
import { IUser } from "@shared/types/user.types";

declare module "socket.io" {
  interface Socket {
    userId: string;
    user: IUser;
  }
}

export interface UserSocket extends Socket {
  userId: string;
}
