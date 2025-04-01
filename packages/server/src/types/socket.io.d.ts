import { Socket } from "socket.io";
import { IUser } from "@shared/types";
import { UserDocument } from "@/routes/users/users.model";

declare module "socket.io" {
  interface Socket {
    userId: string;
    user: UserDocument;
  }
}

export interface UserSocket extends Socket {
  userId: string;
}
