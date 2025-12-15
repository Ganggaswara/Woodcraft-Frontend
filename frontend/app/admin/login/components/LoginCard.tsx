"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../providers/AuthProvider";
import { User, KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function LoginCard() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1b2430] to-[#0f1720] shadow-2xl border border-white/10">
      <div className="p-8">
        <div className="flex items-center justify-center mb-2">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} className="rounded-md" />
        </div>
        <div className="mt-6 text-white text-center">
          <div className="text-xl font-bold">ADMIN PANEL</div>
          <div className="text-white/70 text-sm">Control panel login</div>
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 px-4 py-3 rounded-md bg-white/10 border border-white/10 focus-within:ring-2 focus-within:ring-[#D6B48A]/40">
            <User className="h-4 w-4 text-white/80" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/60"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-md bg-white/10 border border-white/10 focus-within:ring-2 focus-within:ring-[#D6B48A]/40">
            <KeyRound className="h-4 w-4 text-white/80" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/60"
            />
          </div>
        </div>
        <button
          onClick={async () => {
            if (!email || !password) { toast.error("Email dan password wajib diisi"); return; }
            setSubmitting(true);
            try {
              await login(email, password);
              router.push("/admin/dashboard");
            } catch (err) {
              const msg = err instanceof Error ? err.message : "Login gagal";
              toast.error(msg);
            } finally {
              setSubmitting(false);
            }
          }}
          disabled={submitting || loading}
          className="mt-6 w-full px-5 py-3 rounded-md bg-[#F5A623] text-black font-semibold hover:bg-[#f39c12] disabled:opacity-60"
        >
          {submitting || loading ? "Signing in…" : "Login"}
        </button>
      </div>
    </div>
  );
}
