"use client";
import { Bed, Armchair, Utensils, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Reveal from "../utils/Reveal";

export default function FeatureChips() {
  const chips = ["BEDROOM", "LOUNGE", "DINING ROOM", "OFFICE"];
  const [active, setActive] = useState<string | null>(null);

  const iconColor = "currentColor";
  const iconSize = 25;
  const iconStroke = 2;

  const renderIcon = (title: string) => {
    switch (title.toUpperCase()) {
      case "BEDROOM":
        return <Bed size={iconSize} strokeWidth={iconStroke} color={iconColor} />;
      case "LOUNGE":
        return <Armchair size={iconSize} strokeWidth={iconStroke} color={iconColor} />;
      case "DINING ROOM":
        return <Utensils size={iconSize} strokeWidth={iconStroke} color={iconColor} />;
      case "OFFICE":
        return <Briefcase size={iconSize} strokeWidth={iconStroke} color={iconColor} />;
      default:
        return <Armchair size={iconSize} strokeWidth={iconStroke} color={iconColor} />;
    }
  };
  return (
    <div className="bg-[#F5E9DA]">
      <div className="mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
          {chips.map((title) => {
            const isActive = active === title;
            const base = "w-full px-8 py-8 min-h-[120px] flex flex-col items-center justify-center gap-3 transition-colors focus:outline-none";
            const normal = "bg-[#E8D9C6] text-[#5C3D2E] border border-[#5C3D2E]/30 hover:bg-[#5C3D2E] hover:text-white hover:border-[#5C3D2E]";
            const activeCls = "bg-[#5C3D2E] text-white border border-[#5C3D2E]";
            return (
              <Reveal key={title} direction={'up'} duration={700}>
                <Link
                  href={`/products?category=${title === 'BEDROOM' ? 'bedroom' : title === 'LOUNGE' ? 'lounge' : title === 'DINING ROOM' ? 'dining-room' : 'office'}`}
                  onClick={() => setActive(title)}
                  className={`${base} ${isActive ? activeCls : normal}`}
                  aria-label={title}
                >
                  {renderIcon(title)}
                  <span className="text-base font-semibold uppercase">{title}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
