"use client";
import { useCart } from "../../providers/CartProvider";

export default function CartTotal() {
  const { subtotal } = useCart();
  const shipping = 75000;
  const total = subtotal + shipping;
  return (
    <aside className="rounded-2xl bg-white shadow-sm border border-[#E8D9C6] p-6 h-max">
      <div className="text-[#2a1a13] font-semibold mb-4">Cart Total</div>
      <div className="space-y-3 text-[#2a1a13]">
        <div className="flex items-center justify-between  border-[#E8D9C6] pb-2">
          <span>Subtotal</span><span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#E8D9C6] pb-3">
          <span>Discount</span><span>Rp 0</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#E8D9C6] pb-3">
          <span>Shipping</span><span>Rp {shipping.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex items-center justify-between font-bold">
          <span>Total</span><span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>
      <a
        href="/cart/checkout"
        className="mt-6 block w-full text-center px-5 py-2.5 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold hover:bg-[#D6B48A]/90 transition-colors"
      >
        Process to checkout
      </a>
    </aside>
  );
}
