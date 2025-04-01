import { io, Socket } from "socket.io-client";
import { getSession } from "next-auth/react";
import { IUser } from "@shared/types";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";

export const initializeSocket = async (): Promise<Socket | null> => {
  const session = await getSession();
  if (!session?.user) return null;

  return io(SOCKET_URL, {
    auth: {
      token: (session.user as IUser)._id,
    },
  });
};
