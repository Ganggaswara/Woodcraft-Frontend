import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Reveal from "../utils/Reveal";

export default function ContactMap() {
  return (
    <section id="contact" className="bg-[#FAF6EF]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-32 grid md:grid-cols-2 gap-16 items-start">
        <Reveal direction="left" duration={800} className="space-y-6">
          <div className="text-sm uppercase tracking-widest text-[#D6B48A]">Get In Touch</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2a1a13]">Visit Our Showroom</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-6 rounded-xl bg-white shadow-sm border border-[#E8D9C6]">
              <MapPin className="h-6 w-6 text-[#D6B48A]" />
              <span className="text-[#2a1a13]">Jl. Ida Bagus Mantra, Denpasar</span>
            </div>
            <div className="flex items-center gap-3 p-6 rounded-xl bg-white shadow-sm border border-[#E8D9C6]">
              <Clock className="h-6 w-6 text-[#D6B48A]" />
              <span className="text-[#2a1a13]">Monday–Saturday</span>
            </div>
            <div className="flex items-center gap-3 p-6 rounded-xl bg-white shadow-sm border border-[#E8D9C6]">
              <Phone className="h-6 w-6 text-[#D6B48A]" />
              <span className="text-[#2a1a13]">+62 812-3456-7890</span>
            </div>
            <div className="flex items-center gap-3 p-6 rounded-xl bg-white shadow-sm border border-[#E8D9C6]">
              <Mail className="h-6 w-6 text-[#D6B48A]" />
              <span className="text-[#2a1a13]">hello@woodcraft.id</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-[#E8D9C6] p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="px-4 py-3 rounded-md bg-white text-[#2a1a13] placeholder:text-[#7a6555] placeholder:opacity-50 border border-[#E8D9C6] focus:outline-none focus:ring-2 focus:ring-[#D6B48A]/40" placeholder="Nama" />
              <input className="px-4 py-3 rounded-md bg-white text-[#2a1a13] placeholder:text-[#7a6555] placeholder:opacity-50 border border-[#E8D9C6] focus:outline-none focus:ring-2 focus:ring-[#D6B48A]/40" placeholder="Email" />
              <textarea className="sm:col-span-2 px-4 py-3 rounded-md bg-white text-[#2a1a13] placeholder:text-[#7a6555] placeholder:opacity-50 border border-[#E8D9C6] focus:outline-none focus:ring-2 focus:ring-[#D6B48A]/40" placeholder="Pesan" rows={5} />
            </div>
            <div className="flex gap-3 justify-end">
              <button className="px-6 py-3 rounded-md bg-[#5C3D2E] text-white hover:bg-[#5C3D2E]/90">Send</button>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" duration={800} className="mt-12 relative rounded-2xl overflow-hidden border border-[#E8D9C6] shadow-2xl">
          <iframe
            title="Map"
            src="https://www.google.com/maps?q=Denpasar&output=embed"
            className="w-full h-[420px] sm:h-[520px] lg:h-[600px]"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
