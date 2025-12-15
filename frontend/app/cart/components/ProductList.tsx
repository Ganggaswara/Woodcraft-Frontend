"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../providers/CartProvider";

export default function ProductList() {
  const { items, updateQty, remove } = useCart();
  return (
    <div className="space-y-10">
      <div className="rounded-2xl bg-white shadow-sm border border-[#E8D9C6] overflow-hidden">
        <div className="grid grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr_0.3fr] px-6 py-4 text-[#7a6555] text-sm font-semibold">
          <div>Product</div><div>Price</div><div>Quantity</div><div>Subtotal</div><div className="ml-3">Actions</div>
        </div>
        <div className="divide-y divide-[#E8D9C6]">
          {items.length === 0 && (
            <div className="px-6 py-8 text-center text-[#7a6555]">Your cart is empty.</div>
          )}
          {items.map((it) => (
            <div key={it.id} className="grid grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr_0.3fr] items-center px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-[#E8D9C6]">
                  <Image src={it.image} alt={it.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="text-[#2a1a13] font-medium">{it.name}</div>
              </div>
              <div className="text-[#2a1a13]">Rp {it.price.toLocaleString("id-ID")}</div>
              <div>
                <div className="inline-flex items-center gap-2">
                  <button
                    aria-label="decrease quantity"
                    className="h-8 w-8 inline-grid place-items-center rounded-md border border-[#E8D9C6] text-[#2a1a13] hover:bg-[#E8D9C6]/40 hover:border-[#D6B48A] transition-colors"
                    onClick={() => {
                      const nextQty = Math.max(1, it.qty - 1);
                      updateQty(it.id, nextQty);
                    }}
                  ><Minus size={14} /></button>
                  <span className="min-w-[2rem] text-center text-[#2a1a13] font-semibold">{it.qty.toString().padStart(2, "0")}</span>
                  <button
                    aria-label="increase quantity"
                    className="h-8 w-8 inline-grid place-items-center rounded-md border border-[#E8D9C6] text-[#2a1a13] hover:bg-[#E8D9C6]/40 hover:border-[#D6B48A] transition-colors"
                    onClick={() => {
                      updateQty(it.id, it.qty + 1);
                    }}
                  ><Plus size={14} /></button>
                </div>
              </div>
              <div className="text-[#2a1a13] font-semibold">Rp {(it.price * it.qty).toLocaleString("id-ID")}</div>
              <div className="flex items-center justify-center">
                <button
                  aria-label="remove item"
                  className="h-8 w-8 inline-grid place-items-center rounded-md border border-[#E8D9C6] text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
                  onClick={() => {
                    remove(it.id);
                  }}
                ><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3"></div>
    </div>
  );
}
