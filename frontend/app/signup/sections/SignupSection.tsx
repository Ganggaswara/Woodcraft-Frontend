"use client";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SignupSection() {
  const images = ["/Login/Login1.jpg", "/Login/Login2.jpg", "/Login/Login3.jpg"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % images.length), 8000);
    return () => clearInterval(id);
  }, [images.length]);
  return (
    <section className="min-h-screen bg-[#2a1a13] grid lg:grid-cols-2">
      <div className="relative min-h-[40vh] lg:min-h-0">
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2 }}
        >
          <Image src={images[idx]} alt="Signup hero" fill sizes="50vw" className="object-cover" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a1a13]/40 via-[#5C3D2E]/50 to-[#2a1a13]/70" />
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col">
          <div className="flex items-center justify-between">
            <Link href="/" className="px-4 py-2 rounded-md bg-white/50 text-black hover:bg-white/20">&lt;</Link>
            <Image src="/logo.svg" alt="Woodcraft Logo" width={60} height={60} className="rounded-full" />
          </div>
          <div className="mt-auto mb-10 text-white">
            <div className="text-xl sm:text-2xl font-semibold">A Touch of Beauty for Every Space</div>
            <div className="mt-4 flex gap-2 opacity-80">
              {images.map((_, i) => (
                <span key={i} className={"h-1 w-8 rounded-full " + (i === idx ? "bg-white" : "bg-white/40")} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <SignUpForm />
      </div>
    </section>
  );
}
