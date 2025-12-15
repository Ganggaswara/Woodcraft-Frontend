"use client";
import LoginCard from "../components/LoginCard";

export default function LoginSection() {
  return (
    <section className="min-h-screen bg-[url('/Login/Login3.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 min-h-screen grid place-items-center px-6">
        <LoginCard />
      </div>
    </section>
  );
}
