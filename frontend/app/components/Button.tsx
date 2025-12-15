"use client";
import React from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export default function Button({ variant = "primary", size = "md", className = "", children, ...rest }: Props) {
  const base = "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6B48A]/40 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<Variant, string> = {
    primary: "bg-[#5C3D2E] text-white hover:bg-[#5C3D2E]/90",
    secondary: "bg-[#D6B48A] text-[#2a1a13] hover:bg-[#D6B48A]/90",
    outline: "border border-[#5C3D2E] text-[#5C3D2E] bg-transparent hover:bg-[#5C3D2E] hover:text-white",
  };
  const sizes: Record<Size, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
