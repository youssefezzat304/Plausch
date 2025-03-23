"use client";

import { useUserStore } from "@/stores/user.store";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

type ProtectedRouteProps = PropsWithChildren;
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [router, user]);

  return children;
};

export default ProtectedRoute;
