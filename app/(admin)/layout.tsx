import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { UserRole } from "@prisma/client";
import Navbar from "../_components/Navbar";
import SessionProvider from "../SessionProvider";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await validateRequest();

  if (!user || user.role !== UserRole.ADMIN) {
    redirect("/login");
  }

  return (
    <SessionProvider value={{ user, session }}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        {/* <Footer /> */}
      </div>
      <Toaster />
    </SessionProvider>
  );
}
