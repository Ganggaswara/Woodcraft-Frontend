"use client";

export default function SalesByCountry() {
  const rows = [
    { country: "Indonesia", sales: 12_000_000 },
    { country: "United States", sales: 8_500_000 },
    { country: "United Kingdom", sales: 6_000_000 },
    { country: "Japan", sales: 5_000_000 },
    { country: "Australia", sales: 3_500_000 },
  ];
  const total = rows.reduce((a, r) => a + r.sales, 0);
  return (
    <div className="rounded-2xl bg-white border border-[#E8D9C6] p-5">
      <div className="flex items-center justify-between">
        <div className="text-[#2a1a13] font-semibold">Sales by Country</div>
        <div className="text-xs text-[#7a6555]">{formatIDR(total)}</div>
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.country} className="flex items-center justify-between">
            <div className="text-[#2a1a13]">{r.country}</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-36 rounded-full bg-[#FAF6EF] overflow-hidden">
                <div className="h-2 bg-[#5C3D2E]" style={{ width: `${Math.min(100, Math.round((r.sales / total) * 100))}%` }} />
              </div>
              <div className="text-sm text-[#7a6555]">{formatIDR(r.sales)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatIDR(n: number) {
  return "Rp " + n.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}
