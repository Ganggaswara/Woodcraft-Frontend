"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { useCart } from "@/app/providers/CartProvider";
import Image from "next/image";
import InvoiceDate from "../components/InvoiceDate";
import SummaryOrder from "../components/SummaryOrder";
import Reveal from "../../../utils/Reveal";

export default function InvoiceSection({ method }: { method: string }) {
  const { token } = useAuth();
  const { items, subtotal } = useCart();
  const router = useRouter();
  const shipping = 75000;
  const total = subtotal + shipping;
  const now = new Date();
  const due = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
  const invId = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
  const [invIdState] = useState<string>(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("lastInvoiceId") : null;
      return saved || invId;
    } catch {
      return invId;
    }
  });

  useEffect(() => {
    const local = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!local && !token) {
      router.replace("/login");
    }
  }, [token, router]);
  // render always; redirect handled in effect to avoid hydration mismatch

  const label =
    method === "bank" ? "Bank transfer" :
    method === "qris" ? "Qris" :
    method === "card" ? "Credit card" :
    "Cash on delivery";

  const note =
    method === "bank"
      ? "Silakan lakukan transfer sesuai instruksi yang akan dikirim ke email Anda."
      : method === "qris"
      ? "Silakan scan QR disamping."
      : method === "card"
      ? "Pembayaran kartu akan diproses secara aman."
      : "Bayar di tempat saat pesanan diterima.";

  return (
    <section className="bg-[#FAF6EF]">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-8 pt-25 pb-12">
        <div className={method === "qris" ? "grid lg:grid-cols-[420px_minmax(0,1fr)] gap-8 items-start" : ""}>
          {method === "qris" && (
            <Reveal direction="left" duration={800}>
              <div>
                <div className="text-4xl font-extrabold tracking-tight text-[#2a1a13]">INVOICE</div>
                <div className="mt-4 rounded-2xl bg-white border border-[#E8D9C6] p-5 h-max">
                  <div className="relative w-full h-[380px]">
                    <Image src="/Qris.jpg" alt="QRIS" fill sizes="420px" className="object-contain" />
                  </div>
                  <div className="mt-3 text-[#7a6555] text-sm">Scan QR untuk menyelesaikan pembayaran.</div>
                </div>
              </div>
            </Reveal>
          )}
          <Reveal direction="right" duration={800} className={method === "qris" ? "mt-8 lg:mt-10" : ""}>
            <div>
              {method !== "qris" && <div className="text-4xl font-extrabold tracking-tight text-[#2a1a13]">INVOICE</div>}
              <div className="mt-5">
                <InvoiceDate
                  invId={invIdState}
                  invoiceDate={now.toLocaleDateString("id-ID")}
                  dueDate={due.toLocaleDateString("id-ID")}
                  methodLabel={label}
                  note={note}
                />
              </div>
              <SummaryOrder items={items} subtotal={subtotal} shipping={shipping} total={total} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
