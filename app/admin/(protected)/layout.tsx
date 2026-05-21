import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Double check — kalau tidak ada token, redirect
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}