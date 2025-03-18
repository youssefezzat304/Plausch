import LightBg from "@/components/SVG/LightBg";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative h-screen flex flex-col items-center justify-center">
      <div className="absolute text-primary-dark w-[58rem] h-[38rem] bg-white rounded-lg flex z-20">
        {children}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[39rem] w-[59rem] bg-[rgba(231,231,231,0.226)] border border-[rgba(235,235,235,0.6)] rounded-xl" />
      <LightBg className="absolute z-[-10] min-h-screen" />
    </main>
  );
}

export default AuthLayout;
