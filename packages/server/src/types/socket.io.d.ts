import { Socket } from "socket.io";

declare module "socket.io" {
  interface Socket {
    userId: string;
  }
}

export interface UserSocket extends Socket {
  userId: string;
}
