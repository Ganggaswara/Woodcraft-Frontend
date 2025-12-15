"use client";
import Image from "next/image";
import Reveal from "../../utils/Reveal";
import Link from "next/link";
import type { ProductItem } from "../../../lib/api/products";

type Props = { items: ProductItem[] };

export default function ProductGridSection({ items }: Props) {
  return (
    <section className="bg-[#FAF6EF]">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-8">
        <div className="mb-8">
          <div className="text-xs tracking-widest uppercase text-[#D6B48A]">Our Products</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-[#2a1a13]">Explore Our Collection</h1>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length === 0 && (
            <div className="col-span-full text-center text-[#7a6555]">No matching products.</div>
          )}
          {items.map((p, i) => (
            <Reveal key={p.id} direction="left" delay={i * 35} duration={800} className="rounded-2xl bg-white shadow-sm border border-[#E8D9C6] overflow-hidden">
              <div className="relative">
                <Link href={`/products/${p.slug}`} aria-label={p.name}>
                  <Image src={p.image} alt={p.name} width={800} height={520} className="h-72 w-full object-cover" />
                </Link>
                {p.isNew && (
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[#D6B48A] text-white text-xs px-3 py-1">New</span>
                )}
              </div>
              <div className="px-5 pt-4 pb-5">
                <div className="text-lg font-semibold text-[#2a1a13]">{p.name}</div>
                <div className="text-sm text-[#7a6555]">{p.category} • Rating {p.rating ?? "-"}</div>
                <div className="mt-2 flex items-center">
                  <div className="text-[#D6B48A] font-semibold">Rp {p.price.toLocaleString("id-ID")}</div>
                  <Link href={`/products/${p.slug}`} className="ml-auto px-4 py-2 rounded-md bg-[#5C3D2E] text-white text-sm font-semibold">View Details</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
