"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/stores/user.store";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/api/auth";
import { Progress } from "../ui/shadcn/progress";

const publicRoutes = ["/login", "/signup"];

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  const { data, error, isLoading } = useQuery({
    queryKey: ["validateUser"],
    queryFn: fetchUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      if (publicRoutes.includes(pathname)) {
        router.replace("/chat");
      }
    }
  }, [data, pathname, router, setUser]);

  useEffect(() => {
    if (error && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [error, pathname, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Progress />
      </div>
    );
  }

  if (!user && !publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
