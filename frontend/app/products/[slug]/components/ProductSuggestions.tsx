import Image from "next/image";
import Link from "next/link";
import type { ProductItem } from "../../../../lib/api/products";

export default function ProductSuggestions({ items }: { items: ProductItem[] }) {
  return (
    <div>
      <div className="text-sm uppercase tracking-widest text-[#D6B48A]">Our Suggestions</div>
      <h3 className="mt-2 text-2xl font-extrabold text-[#2a1a13]">You may also like</h3>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="rounded-2xl overflow-hidden bg-white border border-[#E8D9C6]">
            <div className="relative h-48">
              <Image src={p.image} alt={p.name} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <div className="px-4 py-3">
              <div className="text-[#2a1a13] font-semibold">{p.name}</div>
              <div className="text-[#D6B48A] font-semibold">Rp {p.price.toLocaleString("id-ID")}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
