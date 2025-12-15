import { Ruler, Palette, Shield, Box, Maximize2 } from "lucide-react";

export default function ProductDescription({ name, description }: { name: string; description: string }) {
  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
      <div>
        <div className="text-sm uppercase tracking-widest text-[#D6B48A]">Description</div>
        <h2 className="mt-2 text-2xl font-extrabold text-[#2a1a13]">{name}</h2>
        <p className="mt-4 text-[#7a6555] leading-relaxed">{description}</p>
      </div>
      <div className="space-y-4">
        <div className="text-[#2a1a13] text-2xl font-semibold">5 ideas for choosing the perfect furniture</div>
        
        <ul className="mt-3 space-y-3">
          <li className="flex items-start gap-3">
            <Ruler size={18} className="text-[#5C3D2E] mt-0.5" />
            <span className="text-[#7a6555]">Measure the space accurately before purchasing furniture.</span>
          </li>
          <li className="flex items-start gap-3">
            <Shield size={18} className="text-[#5C3D2E] mt-0.5" />
            <span className="text-[#7a6555]">Choose materials that are durable and easy to maintain.</span>
          </li>
          <li className="flex items-start gap-3">
            <Palette size={18} className="text-[#5C3D2E] mt-0.5" />
            <span className="text-[#7a6555]">Match the colors with your existing interior palette.</span>
          </li>
          <li className="flex items-start gap-3">
            <Box size={18} className="text-[#5C3D2E] mt-0.5" />
            <span className="text-[#7a6555]">Prioritize functionality: storage, ergonomics, and comfort.</span>
          </li>
          <li className="flex items-start gap-3">
            <Maximize2 size={18} className="text-[#5C3D2E] mt-0.5" />
            <span className="text-[#7a6555]">Pay attention to proportions to avoid overcrowding the space.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
