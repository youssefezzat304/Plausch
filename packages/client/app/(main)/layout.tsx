"use client";
import NavBar from "@/components/ui/NavBar";
import "@/styles/main.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative bg-primary-dark w-full h-screen flex justify-center items-center pt-1.5 pr-1.5 pb-1.5 overflow-hidden bg-[var(--primary-dark)]">
      <NavBar />
      {children}
    </main>
  );
}
