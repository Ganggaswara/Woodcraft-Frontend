"use client";
import { useEffect, useState } from "react";
import { fetchTransactionStatusSummary } from "../../../../lib/api/transactions";

export default function StatsGrid() {
  const [summary, setSummary] = useState<{ pending: number; failed: number } | null>(null);
  useEffect(() => {
    let mounted = true;
    fetchTransactionStatusSummary()
      .then((s) => {
        if (!mounted) return;
        setSummary({ pending: s.pending, failed: s.failed });
      })
      .catch(() => {
        if (!mounted) return;
        setSummary({ pending: 0, failed: 0 });
      });
    return () => {
      mounted = false;
    };
  }, []);
  const pending = summary ? summary.pending : 0;
  const canceled = summary ? summary.failed : 0;
  const displayedPending = pending === 0 ? 1 : pending;
  return (
    <div className="mt-6 grid md:grid-cols-3 gap-4">
      <div className="rounded-2xl bg-white border border-[#E8D9C6] p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-[#7a6555]">Total Sales</div>
            <div className="mt-2 text-3xl font-bold text-[#2a1a13]">Rp 35.000.000</div>
            <div className="mt-1 text-xs text-emerald-600">Last 7 days • +10.4%</div>
            <div className="mt-1 text-xs text-[#7a6555]">Previous 7 days (Rp 3.250.000)</div>
          </div>
          <button className="px-3 py-1.5 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] text-xs">Details</button>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-[#E8D9C6] p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-[#7a6555]">Total Orders</div>
            <div className="mt-2 text-3xl font-bold text-[#2a1a13]">1000</div>
            <div className="mt-1 text-xs text-emerald-600">Last 7 days • +14.4%</div>
            <div className="mt-1 text-xs text-[#7a6555]">Previous 7 days (144)</div>
          </div>
          <button className="px-3 py-1.5 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] text-xs">Details</button>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-[#E8D9C6] p-5">
        <div className="flex items-start justify-between">
          <div className="w-full">
            <div className="text-sm text-[#7a6555]">Pending & Canceled</div>
            <div className="mt-3 grid grid-cols-2 gap-5">
              <div className="rounded-lg bg-[#FAF6EF] border border-[#E8D9C6] p-4 flex flex-col items-center justify-center">
                <div className="text-2xl text-[#2a1a13] font-bold leading-none">{displayedPending}</div>
                <div className="mt-2 text-sm text-[#7a6555]">Pending</div>
              </div>
              <div className="rounded-lg bg-[#FAF6EF] border border-[#E8D9C6] p-4 flex flex-col items-center justify-center">
                <div className="text-2xl text-[#2a1a13] font-bold leading-none">{canceled}</div>
                <div className="mt-2 text-sm text-[#7a6555]">Canceled</div>
              </div>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] text-xs">Details</button>
        </div>
      </div>
    </div>
  );
}
