"use client";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../../../providers/CartProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OrderSummary() {
  const { items, subtotal } = useCart();
  const shipping = 75000;
  const total = subtotal + shipping;
  const [method, setMethod] = useState<"bank" | "qris" | "cod" | "card">("cod");
  const router = useRouter();

  return (
    <div className="space-y-7">

      <div className="space-y-3">
        <div className="text-[#2a1a13] font-semibold">Payment Method</div>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as "bank" | "qris" | "cod" | "card")}
          className="w-full px-3 py-2 rounded-md bg-[#FAF6EF] text-[#2a1a13] border border-[#E8D9C6]"
        >
          <option value="bank">Bank transfer</option>
          <option value="qris">Qris</option>
          <option value="cod">Cash on delivery</option>
          <option value="card">Credit card</option>
        </select>
      </div>

      <div className="space-y-5">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-md overflow-hidden border border-[#E8D9C6]">
                <Image src={it.image} alt={it.name} fill sizes="40px" className="object-cover" />
              </div>
              <div className="text-[#2a1a13]">{it.name}</div>
            </div>
            <div className="text-[#2a1a13] font-semibold">Rp {(it.price * it.qty).toLocaleString("id-ID")}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[#7a6555]"><span>Subtotal:</span><span className="text-[#2a1a13]">Rp {subtotal.toLocaleString("id-ID")}</span></div>
        <div className="flex items-center justify-between text-[#7a6555]"><span>Shipping:</span><span className="text-[#2a1a13]">Rp {shipping.toLocaleString("id-ID")}</span></div>
        <div className="flex items-center justify-between border-t border-[#E8D9C6] pt-2 text-[#2a1a13] font-bold"><span>Total:</span><span>Rp {total.toLocaleString("id-ID")}</span></div>
      </div>

      <div>
        <button
          onClick={async () => {
            const now = new Date();
            const invId = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
            try {
              const billingRaw = typeof window !== "undefined" ? localStorage.getItem("billing") : null;
              const billing = billingRaw ? JSON.parse(billingRaw) : {};
              if (typeof window !== "undefined") {
                localStorage.setItem("lastInvoiceId", invId);
                localStorage.setItem("lastInvoiceMethod", method);
              }
              const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
              const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
              await fetch(`${base}/api/v1/transactions`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                  invoiceId: invId,
                  method,
                  billing,
                  billingDate: now.toISOString(),
                  dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
                  items,
                  subtotal,
                  shipping,
                  total,
                }),
              }).catch(() => null);
            } finally {
              toast.success("Thank you! Your order has been successfully placed.");
              setTimeout(() => {
                router.push(`/cart/invoice/${method}`);
              }, 800);
            }
          }}
          className="w-full px-5 py-3 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold hover:bg-[#D6B48A]/90 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
