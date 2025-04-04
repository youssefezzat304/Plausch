"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user.store";
import { IUser } from "@shared/types";
import Loading from "@/app/Loading";
import { getUser } from "@/api/users";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setIsClient(true);

    if (status === "loading") return;

    if (status === "authenticated") {
      const user = session?.user as IUser;

      const fetchUser = async () => {
        const lastUpdated = await getUser(user._id);
        setUser(lastUpdated);
        return lastUpdated;
      };

      fetchUser();

      if (pathname === "/login" || pathname === "/signup") {
        router.push("/chat");
      }
    }

    if (
      status === "unauthenticated" &&
      !["/login", "/signup", "/"].includes(pathname)
    ) {
      router.push("/login");
    }
  }, [status, session, router, pathname, setUser]);

  if (!isClient || status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
}
