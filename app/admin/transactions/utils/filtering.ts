import type { TxRow } from "../components/TransactionsTable";

export type FilterParams = {
  query: string;
  status: "all" | "paid" | "pending" | "failed";
  month: string;
  year: string;
};

export function applyFilters(rows: TxRow[], params: FilterParams): TxRow[] {
  const q = params.query.trim().toLowerCase();
  let base = q
    ? rows.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.customer.toLowerCase().includes(q) ||
          r.method.toLowerCase().includes(q)
      )
    : rows;
  if (params.status !== "all") {
    base = base.filter((r) => r.status.toLowerCase() === params.status);
  }
  if (params.month !== "all" || params.year !== "all") {
    base = base.filter((r) => {
      const d = new Date(r.date);
      if (isNaN(d.getTime())) return true;
      const mOk = params.month === "all" || d.getMonth() + 1 === Number(params.month);
      const yOk = params.year === "all" || d.getFullYear() === Number(params.year);
      return mOk && yOk;
    });
  }
  return base;
}

export function deriveYears(rows: TxRow[]): number[] {
  const set = new Set<number>();
  rows.forEach((r) => {
    const d = new Date(r.date);
    if (!isNaN(d.getTime())) set.add(d.getFullYear());
  });
  return Array.from(set).sort((a, b) => b - a);
}

export function isValidStatus(s: unknown): s is "pending" | "paid" | "failed" {
  const v = String(s || "").toLowerCase();
  return v === "pending" || v === "paid" || v === "failed";
}
