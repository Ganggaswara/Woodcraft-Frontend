"use client";
type Props = {
  query: string;
  setQuery: (v: string) => void;
  status: "all" | "paid" | "pending" | "failed";
  setStatus: (v: "all" | "paid" | "pending" | "failed") => void;
  month: string;
  setMonth: (v: string) => void;
  year: string;
  setYear: (v: string) => void;
  years?: number[];
};

export default function TransactionsFilters({
  query,
  setQuery,
  status,
  setStatus,
  month,
  setMonth,
  year,
  setYear,
  years,
}: Props) {
  return (
    <div className="grid sm:grid-cols-[1fr_auto_auto_auto] gap-3 items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search transactions"
        className="px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Props["status"])}
        className="px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]"
      >
        <option value="all">All</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]"
      >
        <option value="all">All Months</option>
        <option value="1">Jan</option>
        <option value="2">Feb</option>
        <option value="3">Mar</option>
        <option value="4">Apr</option>
        <option value="5">May</option>
        <option value="6">Jun</option>
        <option value="7">Jul</option>
        <option value="8">Aug</option>
        <option value="9">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
      </select>
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]"
      >
        <option value="all">All Years</option>
        {(years || []).map((y) => (
          <option key={y} value={String(y)}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
