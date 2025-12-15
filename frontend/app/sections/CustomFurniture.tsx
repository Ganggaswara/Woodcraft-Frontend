import Link from "next/link";
import Reveal from "../utils/Reveal";

export default function CustomFurniture() {
  return (
    <section id="custom" className="relative min-h-[780px] md:min-h-[920px]">
      <video
        src="/video1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#2a1a13]/70" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 pt-60 pb-48 md:pt-96 md:pb-72 text-center">
        <Reveal direction="scale" duration={900} className="mx-auto">
          <div className="text-xs tracking-widest uppercase text-[#D6B48A]">Limitless Possibilities</div>
          <h2 className="mt-3 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
            Custom Your Furniture Now 
          </h2>
          <p className="mt-4 text-white/80 max-w-3xl mx-auto">
            Transform your living space with furniture that tells your unique story.
            Custom designs available.
          </p>
          <div className="mt-10 flex items-center justify-center gap-5">
            <Link
              href="#contact"
              className="inline-block px-7 py-3.5 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold hover:bg-[#D6B48A]/90"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="inline-block px-7 py-3.5 rounded-md border border-white text-white hover:bg-white/10"
            >
              View Gallery
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
