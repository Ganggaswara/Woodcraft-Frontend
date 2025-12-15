"use client";
import Image from "next/image";
import Reveal from "../utils/Reveal";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const items = [
    {
      name: "Sarah Mitchell",
      role: "Interior Designer",
      quote:
        "The craftsmanship is absolutely impeccable. Every piece I've ordered has exceeded my expectations. My clients are always impressed with the quality and attention to detail.",
      avatar: "/product-1.jpg",
    },
    {
      name: "Daniel Cooper",
      role: "Architect",
      quote:
        "Timber selection and finishing are world-class. Delivery and installation were smooth — truly professional service.",
      avatar: "/product-2.jpg",
    },
    {
      name: "Amelia Hart",
      role: "Boutique Owner",
      quote:
        "Pieces are timeless and elevate our store ambience. Customers adore the warm finish and solid build.",
      avatar: "/product-3.jpg",
    },
  ];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);
  return (
    <section id="testimonials" className="bg-[#F5E9DA]">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 py-40">
        <div className="grid lg:grid-cols-[1.2fr_1.5fr] gap-20 items-center">
          <Reveal direction="left" duration={800} className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/Login/Login1.jpg" alt="Warm living room" width={2500} height={1600} className="w-full h-[680px] object-cover" />
          </Reveal>

          <div className="ml-10">
            <div className="text-md uppercase font-semibold text-[#D6B48A]">Testimonials</div>
            <h2 className="mt-2 text-5xl md:text-6xl font-extrabold tracking-tight text-[#2a1a13]">Listen to Our Customers</h2>

            <Reveal direction="right" duration={800} className="mt-8 rounded-2xl bg-white shadow-sm p-12 relative shadow-xl">
              <div className="flex items-center gap-1 text-[#D6B48A]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <Quote className="absolute right-6 top-6 h-8 w-8 text-[#E8D9C6]" />
              <p className="mt-4 text-[#2a1a13] leading-relaxed">&ldquo;{items[idx].quote}&rdquo;</p>
              <div className="mt-6">
                <div className="font-semibold text-[#2a1a13]">{items[idx].name}</div>
                <div className="text-sm text-[#7a6555]">{items[idx].role}</div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-1">
                  {items.map((_, i) => (
                    <span key={i} className={`h-1.5 w-5 rounded-full ${i === idx ? "bg-[#D6B48A]" : "bg-[#E8D9C6]"}`} />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={prev} aria-label="Previous" className="h-12 w-12 rounded-full border border-[#E8D9C6] text-[#2a1a13] hover:bg-[#FAF6EF] grid place-items-center">
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button onClick={next} aria-label="Next" className="h-12 w-12 rounded-full border border-[#E8D9C6] text-[#2a1a13] hover:bg-[#FAF6EF] grid place-items-center">
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
