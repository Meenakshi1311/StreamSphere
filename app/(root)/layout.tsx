import LeftSidebar from "@/components/ui/LeftSidebar";
import Mobilenav from "@/components/ui/Mobilenav";
import RightSidebar from "@/components/ui/RightSidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-1">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14 bg-black-3">
          <div className="mx-auto flex w-full max-w-5xl flex-col mx-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image
                src="/icons/logo.svg"
                width={30}
                height={30}
                alt="Menu icon"
              />
              <Mobilenav />
            </div>
            <div className="flex flex-col md:pb-14">
              Toaster (notification Popups)
              {children}
            </div>
          </div>
        </section>
        <RightSidebar />
      </main>
    </div>
  );
}
