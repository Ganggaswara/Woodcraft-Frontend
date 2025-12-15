"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ApplyCoupon() {
  return (
    <div className="grid sm:grid-cols-[1fr_auto] gap-6">
      <div className="flex gap-3">
        <input
          placeholder="Coupon Code"
          className="flex-1 px-4 py-2 rounded-md border border-[#E8D9C6] bg-white text-[#2a1a13]"
        />
        <button className="px-5 py-2 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold hover:bg-[#D6B48A]/90 transition-colors">Apply Coupon</button>
      </div>
      <div className="sm:col-span-2">
        <Link href="/products" className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#D6B48A] text-[#2a1a13] hover:bg-[#D6B48A]/90 transition-colors text-sm">
          <ArrowLeft size={16} className="text-[#5C3D2E]" />
          <span>Back to Shop</span>
        </Link>
      </div>
    </div>
  );
}
