"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user.store";
import { IUser } from "@shared/types/user.types";
import Loading from "@/app/Loading";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setIsClient(true);

    if (status === "loading") return;

    if (status === "authenticated") {
      const user = session?.user as IUser;
      setUser(user);

      if (pathname === "/login" || pathname === "/signup") {
        router.push("/chat");
      }
    }

    if (
      status === "unauthenticated" &&
      !["/login", "/signup"].includes(pathname)
    ) {
      router.push("/login");
    }
  }, [status, session, router, pathname, setUser]);

  if (!isClient || status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
}
