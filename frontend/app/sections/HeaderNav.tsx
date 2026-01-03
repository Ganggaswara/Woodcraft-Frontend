"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User as UserIcon, Settings, HelpCircle, LogOut, ArrowRight, Menu, X } from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

export default function HeaderNav() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Story", href: "/#story" },
    { label: "Contact", href: "/#contact" },
  ];
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const [drop, setDrop] = useState(false);
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#2a1a13]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="grid grid-cols-[auto_1fr_auto] items-center py-3">
          <Link href="/" aria-label="Woodcraft Home" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Woodcraft Logo" width={30} height={30} className="rounded-full mr-1" />
            <span className="text-sm font-semibold text-[#D6B48A]">Woodcraft</span>
          </Link>
          <div className="hidden md:flex items-center justify-center gap-6 text-xs tracking-wide text-[#D6B48A] uppercase">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="font-extrabold text-md mr-3 hover:opacity-70">{l.label}</Link>
            ))}
          </div>
          <div className="flex items-center justify-end gap-3">
              <button
                aria-label="cart"
                className="h-5 w-5 inline-block cursor-pointer"
                onClick={() => {
                  if (user) {
                    router.push('/cart');
                  } else {
                    toast.error('Please Login To Continue');
                    router.push('/login');
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#D6B48A" strokeWidth="1.5"><path d="M6 6h15l-2 9H8L6 6z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
              </button>
              <div className="hidden md:flex items-center gap-3 relative">
              {user ? (
                <button onClick={() => setDrop((v) => !v)} className="inline-flex items-center gap-2 cursor-pointer ml-2">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=64`}
                    alt={user.name}
                    width={24}
                    height={24}
                    unoptimized
                    className="h-6 w-6 rounded-full ring-2 ring-[#D6B48A]/60"
                  />
                  <div className="text-xs text-[#D6B48A] hidden md:block">{user.name}</div>
                </button>
              ) : (
                <button onClick={() => setDrop((v) => !v)} className="inline-flex items-center gap-2 cursor-pointer ml-2">
                  <span aria-label="user" className="h-5 w-5 inline-block">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#D6B48A" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
                  </span>
                </button>
              )}
              {drop && user && (
                <div className="absolute right-[-100px] top-8 w-72 rounded-xl bg-white shadow-2xl border border-[#D6B48A]/30 p-3 text-[#2a1a13]">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=64`}
                      alt={user.name}
                      width={32}
                      height={32}
                      unoptimized
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="text-sm font-semibold">{user.name}</div>
                  </div>
                  {user.email && <div className="px-2 text-xs text-[#5C3D2E]/70">{user.email}</div>}
                  <div className="mt-3 grid gap-1">
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#E8D9C6]/50"><UserIcon size={16} /> <span className="text-sm">View Profile</span></Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#E8D9C6]/50"><Settings size={16} /> <span className="text-sm">Account Settings</span></Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#E8D9C6]/50"><HelpCircle size={16} /> <span className="text-sm">Help & Support</span></Link>


                    <button onClick={() => { logout(); setDrop(false); toast.success('Logout Success'); router.push('/login'); }} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#E8D9C6]/50 text-red-600"><LogOut size={16} /> <span className="text-sm">Log Out</span></button>
                  </div>
                </div>
              )}
              {drop && !user && (
                <div className="absolute right-[-20px] top-8 w-56 rounded-xl bg-white shadow-2xl border border-[#D6B48A]/30 p-3 text-[#2a1a13]">
                  <div className="grid gap-1">
                    <button onClick={() => { setDrop(false); router.push('/login'); }} className="flex cursor-pointer items-center justify-between px-3 py-2 rounded-md hover:bg-[#E8D9C6]/50">
                      <span className="inline-flex items-center gap-3"><UserIcon size={16} /> <span className="text-sm">Log In</span></span>
                      <ArrowRight size={16} className="text-[#5C3D2E]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button aria-label="Open menu" className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md bg-[#E8D9C6]" onClick={() => setOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#D6B48A" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </nav>
      </div>
      <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#2a1a13]/80"
          onClick={() => setOpen(false)}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-17">
            <div className="rounded-lg bg-[#F5E9DA] p-6 space-y-6 relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-[#5C3D2E] hover:opacity-70"
              >
                <X size={24} />
              </button>
              {links.map((l) => (
                <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="block text-[#5C3D2E] text-base font-semibold hover:opacity-80 ">
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-[#5C3D2E]/20 pt-4 mt-4">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=64`}
                        alt={user.name}
                        width={32}
                        height={32}
                        unoptimized
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-semibold text-[#5C3D2E]">{user.name}</div>
                        <div className="text-xs text-[#5C3D2E]/70">{user.email}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { logout(); setOpen(false); toast.success('Logout Success'); router.push('/login'); }} 
                      className="flex items-center gap-2 text-red-600 text-sm font-semibold"
                    >
                      <LogOut size={16} /> Log Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/login" 
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-[#5C3D2E] text-base font-semibold"
                  >
                    <UserIcon size={18} /> Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
