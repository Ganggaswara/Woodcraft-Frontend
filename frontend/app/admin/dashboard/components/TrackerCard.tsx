"use client";
export default function TrackerCard() {
  const target = 100_000_000;
  const achieved = 35_000_000;
  const pct = Math.min(100, Math.round((achieved / target) * 100));
  const formatIDR = (n: number) => "Rp " + n.toLocaleString("id-ID");
  return (
    <div className="rounded-2xl bg-white border border-[#E8D9C6] p-5">
      <div className="text-[#2a1a13] font-semibold">Monthly Target</div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs text-[#7a6555]">Target</div>
          <div className="text-[#2a1a13] font-bold">{formatIDR(target)}</div>
        </div>
        <div>
          <div className="text-xs text-[#7a6555]">Achieved</div>
          <div className="text-[#2a1a13] font-bold">{formatIDR(achieved)}</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-[#FAF6EF] overflow-hidden border border-[#E8D9C6]">
          <div className="h-2 bg-[#5C3D2E]" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 text-xs text-[#7a6555]">{pct}% of target achieved</div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-[#FAF6EF] border border-[#E8D9C6] px-3 py-2">
          <div className="text-xs text-[#7a6555]">New Users</div>
          <div className="text-[#2a1a13] font-semibold">1,245</div>
        </div>
        <div className="rounded-lg bg-[#FAF6EF] border border-[#E8D9C6] px-3 py-2">
          <div className="text-xs text-[#7a6555]">Active Sessions</div>
          <div className="text-[#2a1a13] font-semibold">8,320</div>
        </div>
        <div className="rounded-lg bg-[#FAF6EF] border border-[#E8D9C6] px-3 py-2">
          <div className="text-xs text-[#7a6555]">Conversion</div>
          <div className="text-[#2a1a13] font-semibold">3.7%</div>
        </div>
      </div>
    </div>
  );
}
