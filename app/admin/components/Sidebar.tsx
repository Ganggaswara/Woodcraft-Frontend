"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../providers/AuthProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const items = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Products", href: "/admin/products" },
    { label: "Users", href: "/admin/users" },
    { label: "Transactions", href: "/admin/transactions" },
  ];
  return (
    <aside className="hidden lg:block fixed top-0 left-0 h-screen w-[260px] bg-white border-r border-[#E8D9C6] z-40">
      <div className="h-full flex flex-col">
        <div className="px-3 py-4 text-[#2a1a13] font-extrabold text-xl tracking-tight sticky top-0 bg-white border-b border-[#E8D9C6]">WOODCRAFT ADMIN</div>
        <nav className="flex-1 overflow-y-auto mt-2 space-y-1">
        {items.map((it) => {
          const active = pathname?.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={
                "block px-3 py-2 rounded-lg text-[#2a1a13] " +
                (active ? "bg-[#FAF6EF] font-semibold" : "hover:bg-[#FAF6EF]")
              }
            >
              {it.label}
            </Link>
          );
        })}
        </nav>
        <div className="mt-auto px-3 py-4 border-t border-[#E8D9C6]">
          <button
            onClick={() => { logout(); router.replace("/admin/login"); }}
            className="w-full px-3 py-2 cursor-pointer rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
