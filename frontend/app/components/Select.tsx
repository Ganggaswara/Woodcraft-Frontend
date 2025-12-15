"use client";
import React from "react";

type Option = { label: string; value: string };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  label?: string;
};

export default function Select({ options, label, className = "", ...rest }: Props) {
  const base = "px-3 py-2 rounded-md bg-[#FAF6EF] text-[#2a1a13] border border-[#E8D9C6] focus:outline-none focus:ring-2 focus:ring-[#D6B48A]/40";
  return (
    <div className="space-y-1">
      {label && <div className="text-sm font-medium text-[#2a1a13]">{label}</div>}
      <select className={`${base} ${className}`} {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
