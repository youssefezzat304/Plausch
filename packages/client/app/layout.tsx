"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { Toaster } from "@/components/ui/shadcn/sonner";
import AuthGuard from "@/components/auth/AuthGuard";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <AuthGuard>{children}</AuthGuard>
          <Toaster richColors />
        </QueryClientProvider>
      </body>
    </html>
  );
}
