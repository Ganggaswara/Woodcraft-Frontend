"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const images = [
    "/ChristmasGrid/image1.jpg",
    "/ChristmasGrid/image2.jpg",
    "/ChristmasGrid/image3.jpg",
    "/ChristmasGrid/image4.jpg",
    "/ChristmasGrid/image5.jpg",
    "/ChristmasGrid/image6.jpg",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images.length]);

  const visible = [images[idx], images[(idx + 1) % images.length], images[(idx + 2) % images.length]];

  return (
    <section className="bg-[#FAF6EF]">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-8 py-20">
        <div className="text-center mb-8">
          <div className="text-md font-semibold uppercase tracking-widest text-[#D4AF37]">Christmas Collection</div>
        </div>
        <div className="relative">
          <motion.div
            key={idx}
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr_1fr] gap-6 items-stretch"
          >
            {visible.map((src, i) => (
              <div key={src + i} className="rounded-2xl overflow-hidden bg-white border border-[#E8D9C6]">
                <div className="relative h-70 md:h-90">
                  <Image src={src} alt={`Christmas ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" style={{ filter: i === 1 ? "none" : "blur(8px)" }} />
                </div>
              </div>
            ))}
          </motion.div>
          <button
            aria-label="Previous"
            onClick={() => setIdx((p) => (p - 1 + images.length) % images.length)}
            className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-10 w-10 md:h-16 md:w-16 rounded-full bg-[#5C3D2E]/80 text-white shadow-lg hover:bg-[#5C3D2E] hover:scale-105 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            aria-label="Next"
            onClick={() => setIdx((p) => (p + 1) % images.length)}
            className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-[#5C3D2E]/80 text-white shadow-lg hover:bg-[#5C3D2E] hover:scale-105 transition-transform"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === idx ? "bg-[#5C3D2E]" : "bg-[#D6B48A]"}`} />)
          )}
        </div>
      </div>
    </section>
  );
}
