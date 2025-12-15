"use client";
import Image from "next/image";
import type { CartItem } from "@/lib/cart";
export default function SummaryOrder({ items, subtotal, shipping, total }: { items: CartItem[]; subtotal: number; shipping: number; total: number }) {
  return (
    <div className="mt-6 rounded-xl bg-white border border-[#E8D9C6] overflow-hidden">
      <div className="grid grid-cols-[1.4fr_0.5fr_0.6fr_0.8fr] px-4 py-3 text-[#7a6555] text-sm font-semibold">
        <div>Products</div><div>Qty</div><div>Price</div><div>Subtotal</div>
      </div>
      <div className="divide-y divide-[#E8D9C6]">
        {items.map((it) => (
          <div key={it.id} className="grid grid-cols-[1.4fr_0.5fr_0.6fr_0.8fr] items-center px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-md overflow-hidden border border-[#E8D9C6]">
                <Image src={it.image} alt={it.name} fill sizes="32px" className="object-cover" />
              </div>
              <div className="text-[#2a1a13] text-base">{it.name}</div>
            </div>
            <div className="text-[#2a1a13] text-base">{it.qty}</div>
            <div className="text-[#2a1a13] text-base">Rp {it.price.toLocaleString("id-ID")}</div>
            <div className="text-[#2a1a13] text-base font-semibold">Rp {(it.price * it.qty).toLocaleString("id-ID")}</div>
          </div>
        ))}
      </div>
      <div className="px-4 py-4 space-y-1">
        <div className="flex items-center justify-between text-[#7a6555] text-base"><span>Subtotal</span><span className="text-[#2a1a13]">Rp {subtotal.toLocaleString("id-ID")}</span></div>
        <div className="flex items-center justify-between text-[#7a6555] text-base"><span>Shipping</span><span className="text-[#2a1a13]">Rp {shipping.toLocaleString("id-ID")}</span></div>
        <div className="flex items-center justify-between pt-2 border-t border-[#E8D9C6]">
          <span className="text-[#2a1a13] text-base font-semibold">Total due</span>
          <span className="text-[#2a1a13] text-base font-bold">Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
}
