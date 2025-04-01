"use client";
import { useUserStore } from "@/stores/user.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { IUser } from "@shared/types";

export function UserInitializer() {
  const { data: session } = useSession();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as IUser);
    }
  }, [session]);

  return null;
}
