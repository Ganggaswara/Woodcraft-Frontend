"use client";
import { useState } from "react";
export default function BillingForm() {
  const field = "w-full px-4 py-3 rounded-md bg-[#FAF6EF] text-[#2a1a13] placeholder:text-[#7a6555] border border-[#E8D9C6] focus:outline-none focus:ring-2 focus:ring-[#D6B48A]/40";
  const initial = (() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("billing") : null;
      return raw ? (JSON.parse(raw) || {}) : {};
    } catch {
      return {};
    }
  })() as Partial<{ firstName: string; street: string; apt: string; city: string; phone: string; email: string }>;
  const [firstName, setFirstName] = useState(initial.firstName || "");
  const [street, setStreet] = useState(initial.street || "");
  const [apt, setApt] = useState(initial.apt || "");
  const [city, setCity] = useState(initial.city || "");
  const [phone, setPhone] = useState(initial.phone || "");
  const [email, setEmail] = useState(initial.email || "");
  function save(partial: Partial<{ firstName: string; street: string; apt: string; city: string; phone: string; email: string }>) {
    const next = { firstName, street, apt, city, phone, email, ...partial };
    if (typeof window !== "undefined") localStorage.setItem("billing", JSON.stringify(next));
  }
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-[#2a1a13] mb-2 block">Name*</label>
        <input className={field} placeholder="First Name" value={firstName} onChange={(e) => { setFirstName(e.target.value); save({ firstName: e.target.value }); }} />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#2a1a13] mb-2 block">Street Address*</label>
        <input className={field} placeholder="Street Address" value={street} onChange={(e) => { setStreet(e.target.value); save({ street: e.target.value }); }} />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#2a1a13] mb-2 block">Apartment, floor, etc. (optional)</label>
        <input className={field} placeholder="Apartment, floor" value={apt} onChange={(e) => { setApt(e.target.value); save({ apt: e.target.value }); }} />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#2a1a13] mb-2 block">Town/City*</label>
        <input className={field} placeholder="Town/City" value={city} onChange={(e) => { setCity(e.target.value); save({ city: e.target.value }); }} />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#2a1a13] mb-2 block">Phone Number*</label>
        <input className={field} placeholder="Phone Number" value={phone} onChange={(e) => { setPhone(e.target.value); save({ phone: e.target.value }); }} />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#2a1a13] mb-2 block">Email Address*</label>
        <input className={field} placeholder="Email Address" type="email" value={email} onChange={(e) => { setEmail(e.target.value); save({ email: e.target.value }); }} />
      </div>
      <label className="mt-2 flex items-center gap-3 text-[#7a6555]">
        <input type="checkbox" className="h-4 w-4" defaultChecked />
        <span>Save this information for faster check-out next time</span>
      </label>
    </div>
  );
}
