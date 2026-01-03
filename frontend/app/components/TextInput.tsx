"use client";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function TextInput({ label, error, className = "", ...rest }: Props) {
  const base = "w-full px-3 py-2 rounded-md bg-[#FAF6EF] text-[#2a1a13] placeholder:text-[#7a6555] placeholder:opacity-60 border border-[#E8D9C6] focus:outline-none focus:ring-2 focus:ring-[#D6B48A]/40";
  return (
    <div className="space-y-1">
      {label && <div className="text-sm font-medium text-[#2a1a13]">{label}</div>}
      <input className={`${base} ${className}`} {...rest} />
      {error && <div className="text-xs text-red-600">{error}</div>}
    </div>
  );
}
