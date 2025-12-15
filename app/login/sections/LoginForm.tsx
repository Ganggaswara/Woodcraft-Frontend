"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Apple } from "lucide-react";
import { useAuth } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const field = "w-full px-4 py-3 rounded-md bg-[#E8D9C6] text-[#2a1a13] placeholder:text-[#7a6555] border border-[#D6B48A] focus:outline-none focus:ring-2 focus:ring-[#D6B48A]";
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const msg = sessionStorage.getItem('flash');
      if (msg) {
        toast.success(msg);
        sessionStorage.removeItem('flash');
      }
    }
  }, []);
  useEffect(() => {
    if (error) {
      const id = setTimeout(() => setError(''), 2500);
      return () => clearTimeout(id);
    }
  }, [error]);
  return (
    <div className="w-full max-w-[520px] text-white">
      {error && (
        <div className="fixed top-6 right-6 z-[1000]">
          <div className={"rounded-md border px-4 py-3 shadow-lg bg-red-50 border-red-200 text-red-700"}>
            <div className="font-semibold">Error</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        </div>
      )}
      <div className="text-3xl sm:text-4xl font-bold">Log in</div>
      <div className="mt-2 text-white/70">Don&rsquo;t have an account? <Link href="/signup" className="underline">Create one</Link></div>

      <div className="mt-8">
        <input className={field} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mt-3 relative">
        <input className={field} placeholder="Enter your password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C3D2E]/70">
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button
        onClick={async () => {
          setError('');
          setLoading(true);
          try {
            await login(email, password);
            toast.success('Login success');
            setTimeout(() => {
              router.replace('/');
              router.refresh();
            }, 1200);
          } catch (e) {
            const msg = e instanceof Error ? e.message : 'Login failed';
            setError(msg);
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
        className="mt-6 w-full px-5 py-3 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold hover:bg-[#D6B48A]/90"
      >
        {loading ? 'Logging in…' : 'Log in'}
      </button>

      <div className="mt-6 flex items-center gap-3 text-white/60">
        <span className="flex-1 border-t border-white/20" />
        <span>Or continue with</span>
        <span className="flex-1 border-t border-white/20" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="px-4 py-2 rounded-md bg-[#E8D9C6] text-[#2a1a13] border border-[#D6B48A]">Google</button>
        <button className="px-4 py-2 rounded-md bg-[#E8D9C6] text-[#2a1a13] border border-[#D6B48A] inline-flex items-center justify-center gap-2"><Apple size={18} /> Apple</button>
      </div>
    </div>
  );
}
