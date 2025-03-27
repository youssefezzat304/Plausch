import { useSocketStore } from "@/stores/socket.store";
import { useEffect } from "react";
import { io } from "socket.io-client";

const SocketInitializer = () => {
  const setSocket = useSocketStore((state) => state.setSocket);

  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080",
      {
        withCredentials: true,
        transports: ["websocket"],
      },
    );

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [setSocket]);

  return null;
};

export default SocketInitializer;
