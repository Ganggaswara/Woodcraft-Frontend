"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function SignUpForm() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const field = "w-full px-4 py-3 rounded-md bg-[#E8D9C6] text-[#2a1a13] placeholder:text-[#7a6555] border border-[#D6B48A] focus:outline-none focus:ring-2 focus:ring-[#D6B48A]";
  return (
    <div className="w-full max-w-[520px] text-white">
      <div className="text-3xl sm:text-4xl font-bold">Create an account</div>
      <div className="mt-2 text-white/70">Already have an account? <Link href="/login" className="underline">Log in</Link></div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className={field} placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input className={field} placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="mt-3">
        <input className={field} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mt-3 relative">
        <input className={field} placeholder="Enter your password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C3D2E]/70">
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <label className="mt-4 flex items-center gap-3 text-white/80">
        <input type="checkbox" className="h-4 w-4 cursor-pointer" />
        <span>I agree to the <Link href="#" className="underline">Terms & Conditions</Link></span>
      </label>

      <button
        onClick={async () => {
          setLoading(true);
          setError('');
          try {
            const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
            const res = await fetch(`${base}/api/v1/auth/signup`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ firstName, lastName, email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed');
            toast.success("Your account is ready! Please log in to continue.");
            setTimeout(() => {
              router.push('/login');
            }, 1500);
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Registration failed';
            setError(message);
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
        className="mt-6 w-full cursor-pointer px-5 py-3 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold hover:bg-[#D6B48A]/90"
      >
        {loading ? 'Creating account…' : 'Create account'}
      </button>
      {error && <div className="mt-3 text-red-400">{error}</div>}

      <div className="mt-6 flex items-center gap-3 text-white/60">
        <span className="flex-1 border-t border-white/20" />
        <span>Or register with</span>
        <span className="flex-1 border-t border-white/20" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="px-4 py-2 cursor-pointer rounded-md bg-[#E8D9C6] text-[#2a1a13] border border-[#D6B48A] inline-flex items-center justify-center gap-2">
          <Image src="/google-logo1.png" alt="Google" width={60} height={60} />
          
        </button>
        <button className="px-4 py-2 cursor-pointer rounded-md bg-[#E8D9C6] text-[#2a1a13] border border-[#D6B48A] inline-flex items-center justify-center">
          <Image src="/apple.png" alt="Apple" width={25} height={25} />
        </button>
      </div>
    </div>
  );
}
