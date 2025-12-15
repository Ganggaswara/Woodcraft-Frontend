"use client";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const pageTitle =
    pathname?.startsWith("/admin/dashboard") ? "Dashboard" :
    pathname?.startsWith("/admin/products") ? "Products" :
    pathname?.startsWith("/admin/users") ? "Users" :
    pathname?.startsWith("/admin/transactions") ? "Transactions" :
    "Admin Panel";
  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 z-30 bg-white border-b border-[#E8D9C6]">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-extrabold tracking-tight text-[#2a1a13]">{pageTitle}</div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search data, users, or reports"
            className="px-3 py-2 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] w-[360px]"
          />
          <button className="h-9 px-3 rounded-md bg-[#5C3D2E] text-white text-sm">Search</button>
        </div>
      </div>
    </header>
  );
}
