 "use client";

export type TxRow = {
  id: string;
  customer: string;
  date: string;
  method: string;
  status: "Paid" | "Pending" | "Failed";
  amount: number;
  numericId?: number;
  invoiceId?: string;
};

export default function TransactionsTable({
  rows,
  loading,
  onEdit,
  onDelete,
}: {
  rows: TxRow[];
  loading: boolean;
  onEdit: (row: TxRow) => void;
  onDelete: (row: TxRow) => void;
}) {
  return (
    <div className="rounded-2xl bg-white border border-[#E8D9C6] overflow-hidden">
      <div className="grid grid-cols-7 px-5 py-3 text-[#7a6555] text-sm font-semibold">
        <div>No</div>
        <div>Id</div>
        <div>Customer</div>
        <div>Order Date</div>
        <div>Status</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="divide-y divide-[#E8D9C6]">
        {loading && <div className="px-5 py-6 text-[#7a6555]">Loading…</div>}
        {!loading && rows.map((row, idx) => (
          <div key={row.id} className="grid grid-cols-7 items-center px-5 py-4">
            <div className="text-[#2a1a13]">{idx + 1}.</div>
            <div className="text-[#2a1a13]">{row.id}</div>
            <div className="text-[#2a1a13]">{row.customer}</div>
            <div className="text-[#2a1a13]">{row.date}</div>
            <div className="text-xs">
              <span
                className={
                  "inline-flex items-center rounded-full px-2 py-1 border " +
                  (row.status === "Paid" ? "border-emerald-300 text-[#2a1a13]" :
                   row.status === "Pending" ? "border-yellow-300 text-[#2a1a13]" :
                   "border-red-300 text-red-600")
                }
              >
                {row.status}
              </span>
            </div>
            <div className="text-right text-[#2a1a13]">Rp {row.amount.toLocaleString("id-ID")}</div>
            <div className="text-right">
              <div className="inline-flex gap-2">
                <button onClick={() => onEdit(row)} className="px-3 py-1.5 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] text-xs">Edit</button>
                <button onClick={() => onDelete(row)} className="px-3 py-1.5 rounded-md bg-red-50 border border-red-200 text-red-600 text-xs">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {!loading && rows.length === 0 && <div className="px-5 py-6 text-[#7a6555]">No transactions</div>}
      </div>
      <div className="px-5 py-3 text-right"></div>
    </div>
  );
}
