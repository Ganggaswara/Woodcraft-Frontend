"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "../../providers/AuthProvider";
import ProductList from "../components/ProductList";
import ApplyCoupon from "../components/ApplyCoupon";
import CartTotal from "../components/CartTotal";
import Reveal from "../../utils/Reveal";

export default function CartSection() {
  const { token } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const local = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!local && !token) {
      toast.error("Please Login To Continue");
      router.replace("/login");
    }
  }, [token, router]);
  return (
    <section className="bg-[#FAF6EF]">
      <div className="mx-auto  max-w-[88rem] px-6 sm:px-8 pt-24 md:pt-28 pb-20 grid lg:grid-cols-[1fr_380px] gap-10">
        <Reveal direction="up" duration={700} className="lg:col-span-2">
          <div className="text-3xl font-extrabold tracking-tight text-[#2a1a13]">CART</div>
        </Reveal>
        <Reveal direction="left" duration={700} className="space-y-6">
          <div className="space-y-6">
            <ProductList />
            <ApplyCoupon />
          </div>
        </Reveal>
        <Reveal direction="right" duration={700}>
          <div>
            <CartTotal />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
