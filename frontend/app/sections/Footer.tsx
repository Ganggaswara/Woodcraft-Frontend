import Reveal from "../utils/Reveal";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2a1a13] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <Reveal direction="up" duration={700} className="space-y-3 col-span-2 md:col-span-1 flex justify-center md:justify-start">
          <div className="flex items-center gap-2 translate-x-4 md:translate-x-0">
            <Image src="/logo-with-text.svg" alt="Woodcraft" width={240} height={60} />
          </div>
        </Reveal>
        <Reveal direction="left" duration={700} className="md:pl-0">
          <div className="font-semibold">Shop</div>
          <ul className="mt-2 space-y-1 text-sm text-white/80">
            <li>Furniture</li>
            <li>Living Room</li>
            <li>Bedroom</li>
            <li>Office</li>
          </ul>
        </Reveal>
        <Reveal direction="right" duration={700} className="md:pl-0">
          <div className="font-semibold">Support</div>
          <ul className="mt-2 space-y-1 text-sm text-white/80">
            <li>Help Center</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Warranty</li>
          </ul>
        </Reveal>
        <Reveal direction="scale" duration={700} className="space-y-2 col-span-2 md:col-span-1 md:justify-self-end md:translate-x-2">
          <div className="font-semibold">Newsletter</div>
          <form className="mt-2 flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 min-w-0 px-4 py-2.5 rounded-md bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#D6B48A]/40"
            />
            <button type="button" className="px-5 py-2.5 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold hover:bg-[#D6B48A]/90">
              Subscribe
            </button>
          </form>
          <div className="text-xs text-white/50">Dapatkan update produk terbaru dan promo.</div>
        </Reveal>
      </div>
      <div className="bg-black/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-sm flex items-center justify-between">
          <span>© {new Date().getFullYear()} Woodcraft</span>
          <span className="space-x-3"><a>Privacy</a><a>Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
