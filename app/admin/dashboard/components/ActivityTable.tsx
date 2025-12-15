"use client";
import { useEffect, useState } from "react";
import { fetchRecentTransactions, type TransactionItem } from "../../../../lib/api/transactions";

type Row = {
  id: string;
  customer: string;
  status: "paid" | "pending" | "failed";
  total: number;
  date: string;
};

export default function ActivityTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchRecentTransactions(8)
      .then((list) => {
        if (!mounted) return;
        const mapped: Row[] = list.map((t: TransactionItem) => {
          const name =
            t.billingFirstName ||
            t.customer?.name ||
            [t.customer?.firstName, t.customer?.lastName].filter(Boolean).join(" ") ||
            "—";
          const s = String(t.status || "").toLowerCase();
          const status: Row["status"] = s === "paid" ? "paid" : s === "failed" ? "failed" : "pending";
          const total = Number(t.total ?? 0);
          const dateStr = t.billingDate || t.createdAt || new Date().toISOString();
          return {
            id: t.invoiceId || "—",
            customer: name,
            status,
            total,
            date: dateStr,
          };
        });
        setRows(mapped);
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="rounded-2xl bg-white border border-[#E8D9C6] overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="text-[#2a1a13] font-semibold">Recent Transactions</div>
        <button className="px-3 py-1.5 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] text-xs">View all</button>
      </div>
      <div className="divide-y divide-[#E8D9C6]">
        <div className="grid grid-cols-5 px-5 py-3 text-[#7a6555] text-sm font-semibold mb-2">
          <div>Invoice</div>
          <div>Customer</div>
          <div>Status</div>
          <div>Total</div>
          <div>Date</div>
        </div>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="grid grid-cols-5 items-center px-5 py-3 ml-4">
                <div className="text-[#2a1a13]">
                  <div className="h-4 w-24 bg-[#FAF6EF] rounded" />
                </div>
                <div className="text-[#2a1a13]">
                  <div className="h-4 w-28 bg-[#FAF6EF] rounded" />
                </div>
                <div className="text-xs">
                  <div className="h-5 w-16 bg-[#FAF6EF] rounded-full border border-[#E8D9C6]" />
                </div>
                <div className="text-[#2a1a13]">
                  <div className="h-4 w-16 bg-[#FAF6EF] rounded" />
                </div>
                <div className="text-[#2a1a13]">
                  <div className="h-4 w-20 bg-[#FAF6EF] rounded" />
                </div>
              </div>
            ))
          : rows.map((row) => (
              <div key={row.id} className="grid grid-cols-5 items-center px-5 py-3">
                <div className="text-[#2a1a13]">{row.id}</div>
                <div className="text-[#2a1a13]">{row.customer}</div>
                <div className="text-xs">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2 py-1 border " +
                      (row.status === "paid"
                        ? "border-emerald-300 text-[#2a1a13]"
                        : row.status === "pending"
                        ? "border-[#E8D9C6] text-[#2a1a13]"
                        : "border-[#E8D9C6] text-red-600")
                    }
                  >
                    {row.status}
                  </span>
                </div>
                <div className="text-[#2a1a13]">{`Rp ${row.total.toLocaleString("id-ID")}`}</div>
                <div className="text-[#2a1a13]">{new Date(row.date).toLocaleDateString()}</div>
              </div>
            ))}
      </div>
    </div>
  );
}
