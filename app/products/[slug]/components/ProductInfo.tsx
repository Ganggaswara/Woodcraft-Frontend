"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../providers/AuthProvider";
import { useCart } from "../../../providers/CartProvider";
import toast from "react-hot-toast";

export default function ProductInfo({ id, slug, image, price, name, description }: { id: string; slug: string; image: string; price: number; name: string; description: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { add } = useCart();
  return (
    <div className="mt-6 md:mt-8 lg:mt-30">
      <div className="text-[#D6B48A] text-lg font-bold">Rp {price.toLocaleString("id-ID")}</div>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2a1a13]">{name}</h1>
      <p className="mt-3 text-[#7a6555]">{description}</p>

      

      <div className="mt-8 grid gap-3">
        <button
          onClick={() => {
            if (!user) { toast.error("Please Login To Continue"); router.push('/login'); return; }
            add({ id, slug, name, price, qty: 1, image });
            toast.success(`${name} added to cart`);
            router.push('/cart');
          }}
          className="w-full cursor-pointer px-6 py-3 rounded-md bg-[#5C3D2E] text-white font-semibold"
        >
          Add to cart
        </button>
        <Link href="/products" className="inline-block w-full px-6 py-3 rounded-md border border-[#E8D9C6] text-[#2a1a13] text-center">Back to catalog</Link>
      </div>
    </div>
  );
}
