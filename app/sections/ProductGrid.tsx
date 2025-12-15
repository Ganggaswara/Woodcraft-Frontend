import Image from "next/image";
import Reveal from "../utils/Reveal";
import Link from "next/link";
import { fetchProducts } from "../../lib/api/products";

export default async function ProductGrid() {
  const items = (await fetchProducts()).slice(0, 4);
  return (
    <section id="catalog" className="bg-[#FAF6EF]">
      <div className="mx-auto  max-w-[100rem] px-8 sm:px-10 py-36">
        <div className="mb-12 text-center">
          <div className="text-xl tracking-widest uppercase text-[#D4AF37] font-bold">Our Collection</div>
          <h2 className="mt-3 text-5xl md:text-6xl font-bold tracking-tight text-[#2a1a13]">Explore Best Product</h2>
          <div className="mt-5 text-[#2a1a13] text-lg">From Our Master Craftsman</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={i * 60} direction="up" duration={900} className="rounded-2xl bg-white shadow-sm p-0 overflow-hidden">
              <div className="relative">
                {p.isNew && (
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[#D6B48A] text-white text-xs px-3 py-1">New</span>
                )}
                <Link href={`/products/${p.slug}`} aria-label={p.name}>
                  <Image src={p.image} alt={p.name} width={640} height={400} className="h-80 w-full object-cover" />
                </Link>
              </div>
              <div className="px-5 pt-4 pb-5">
                <div className="text-xl font-semibold text-[#2a1a13]">{p.name}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-[#D6B48A] font-semibold text-lg">Rp {p.price.toLocaleString("id-ID")}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/products" aria-label="Explore Our Product" className="inline-block px-8 py-4 rounded-md bg-[#5C3D2E] text-white uppercase tracking-wide hover:bg-[#5C3D2E]/90">
            Explore Our Product
          </Link>
        </div>
      </div>
    </section>
  );
}
