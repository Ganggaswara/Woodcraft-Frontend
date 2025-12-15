"use client";
import React from "react";

type Color = "gold" | "brown" | "neutral";

type Props = {
  children: React.ReactNode;
  color?: Color;
  className?: string;
};

export default function Badge({ children, color = "gold", className = "" }: Props) {
  const colors: Record<Color, string> = {
    gold: "bg-[#D6B48A] text-white",
    brown: "bg-[#5C3D2E] text-white",
    neutral: "bg-[#E8D9C6] text-[#2a1a13]",
  };
  const cls = `inline-flex items-center rounded-full text-xs px-3 py-1 ${colors[color]} ${className}`;
  return <span className={cls}>{children}</span>;
}
