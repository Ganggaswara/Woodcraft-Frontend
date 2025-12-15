"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  className?: string;
};

export default function Slideshow({ images, className = "" }: Props) {
  const [idx, setIdx] = useState(0);
  const [cooldown, setCooldown] = useState(false);
  const clickDelayMs = 150;
  const transitionMs = 500;
  const goto = (to: number) => {
    if (cooldown) return;
    setCooldown(true);
    setTimeout(() => setIdx(to), clickDelayMs);
    setTimeout(() => setCooldown(false), clickDelayMs + transitionMs);
  };
  const prev = () => goto((idx - 1 + images.length) % images.length);
  const next = () => goto((idx + 1) % images.length);

  const rounded = "rounded-xl";

  return (
    <div className={`relative overflow-hidden border border-[#E8D9C6] min-h-[460px] sm:min-h-[540px] lg:min-h-[580px] ${rounded} ${className}`}>
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={img} className="relative w-full h-full flex-shrink-0">
            <Image
              src={img}
              alt={`About gallery ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              className={`object-cover ${i === 2 ? "object-[15%_center]" : "object-left"}`}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous"
        onClick={prev}
        disabled={cooldown}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#E8D9C6] text-[#5C3D2E] grid place-items-center hover:bg-[#E8D9C6]/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        disabled={cooldown}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#E8D9C6] text-[#5C3D2E] grid place-items-center hover:bg-[#E8D9C6]/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goto(i)}
            disabled={cooldown}
            className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-[#5C3D2E]" : "bg-[#E8D9C6]"}`}
          />
        ))}
      </div>
    </div>
  );
}

