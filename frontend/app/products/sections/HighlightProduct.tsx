import Reveal from "../../utils/Reveal";
import Link from "next/link";
import Image from "next/image";

export default function HighlightProduct() {
  return (
    <section className="bg-[#FAF6EF]">
      <div className="mx-auto mt-10 max-w-[90rem] px-6 sm:px-8 py-16">
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
          <Reveal direction="left" duration={800} className="rounded-2xl overflow-hidden bg-white border border-[#E8D9C6]">
            <div className="relative w-full h-[280px] sm:h-[380px] md:h-[420px]">
              <Image src="/Office/Becik-Office-Table.jpg" alt="Featured product" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal direction="right" duration={800} className="rounded-2xl overflow-hidden bg-white border border-[#E8D9C6]">
          <div className="rounded-2xl overflow-hidden bg-white border border-[#E8D9C6]">
            <div className="p-8 sm:p-12">
              <div className="flex items-center justify-between">
                <div className="text-sm uppercase tracking-widest text-[#D6B48A]">Sale Off</div>
                <span className="inline-flex items-center justify-center h-15 w-15 rounded-full bg-[#E36A5D] text-white text-lg font-bold">-35%</span>
              </div>
              <h2 className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#2a1a13]">Becik Office<br/>Table</h2>
              <p className="mt-4 text-[#7a6555] max-w-md">Experience elegant wood design and lasting comfort for your workspace. Limited promo for our latest collection.</p>
              <div className="mt-8">
                <Link href="/products/becik-office-table" className="inline-block px-5 py-2.5 rounded-md bg-[#5C3D2E] text-white font-semibold hover:bg-[#5C3D2E]/90">View Details</Link>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
