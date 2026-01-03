import Image from "next/image";
import Reveal from "../utils/Reveal";
import Link from "next/link";

export default function Hero() {
  const leftImg = "/vector.svg";
  const rightImg = "/hero-image.svg";
  return (
    <section className="relative min-h-screen pt-20">
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative">
          <Image 
            src={leftImg}
            alt="Decorative vector"
            fill
            sizes="50vw"
            className="object-cover object-left"
            priority
          />
          <div className="absolute inset-0 z-20 flex items-center col-span-2">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Reveal direction="up" duration={900} className="max-w-2xl text-left">
                <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.05]">
                  <span className="text-white">Elevate Your Home</span>
                  <br /><span className="text-[#D6B48A]">With Exquisite</span>
                  <br /><span className="text-white">Wood Furniture</span>
                </h1>
              </Reveal>
                <Reveal direction="scale" duration={900} className="space-y-6 md:space-y-10">
                  <p className="text-white/90 max-w-xl mt-4">
                    The warmth of wood and the finest craftsmanship for your home.
                  </p>
                <Link href="/products" className="px-5 py-2.5 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold">Discover</Link>
                </Reveal>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image 
            src={rightImg}
            alt="Interior wood"
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#2a1a13]/80 via-[#2a1a13]/60 to-transparent" />
      </div>
    </section>
  );
}
