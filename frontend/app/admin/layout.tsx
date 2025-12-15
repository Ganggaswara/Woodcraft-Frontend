"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname?.startsWith("/admin/login");
  const router = useRouter();
  const { user, token, ready } = useAuth();

  useEffect(() => {
    if (isLogin) return;
    if (!ready) return;
    if (!token) { router.replace("/admin/login"); return; }
    if (user && user.role && user.role !== "admin") {
      router.replace("/admin/login");
    }
  }, [isLogin, token, user, ready, router]);
  if (isLogin) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      <Sidebar />
      <div className="lg:ml-[260px] border-l border-[#E8D9C6]">
        <Header />
        <div className="pt-16 min-h-screen overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
