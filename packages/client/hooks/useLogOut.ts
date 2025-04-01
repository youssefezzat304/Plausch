import { signOut } from "next-auth/react";
import { useUserStore } from "@/stores/user.store";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSocketStore } from "@/stores/socket.store";
import useChatStore from "@/stores/chat.store";

const useLogOut = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setCurrentChat = useChatStore((state) => state.setCurrentChat);
  const setSocket = useSocketStore((state) => state.setSocket);
  const router = useRouter();
  const socket = useSocketStore((state) => state.socket);

  const { mutate: logOut } = useMutation({
    mutationFn: async () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }

      await signOut({ redirect: false });

      const response = await auth.get("/logout");
      return response.data;
    },
    onSuccess: () => {
      setUser(null);
      setCurrentChat(null);
      localStorage.removeItem("me");

      router.push("/login");
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });

  const handleLogOut = () => {
    logOut();
  };

  return { handleLogOut };
};

export default useLogOut;
