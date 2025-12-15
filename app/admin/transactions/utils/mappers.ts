import type { TxRow } from "../components/TransactionsTable";
import type { TransactionPayload } from "./api";

export function mapApiTransactionToRow(t: Record<string, unknown>): TxRow {
  const idOrInvoice = String((t.invoiceId as string) || (t.id as number) || "");
  const customer = String((t.billingFirstName as string) || "");
  const date = String((t.billingDate as string) || (t.createdAt as string) || "");
  const method = String(t.method || "");
  const s = String(t.status || "").toLowerCase();
  const statusLabel: TxRow["status"] = s === "paid" ? "Paid" : s === "failed" ? "Failed" : "Pending";
  const amount = Number(t.total ?? 0);
  const numericId = typeof t.id === "number" ? (t.id as number) : undefined;
  const invoiceId = typeof t.invoiceId === "string" ? (t.invoiceId as string) : undefined;
  return { id: idOrInvoice, customer, date, method, status: statusLabel, amount, numericId, invoiceId };
}

export function mapApiListToRows(list: Record<string, unknown>[]): TxRow[] {
  return list.map(mapApiTransactionToRow);
}

export function buildPayload(form: {
  invoiceId: string;
  method: string;
  status: "pending" | "paid" | "failed";
  billingFirstName: string;
  billingEmail: string;
  billingDate: string;
  dueDate: string;
  itemsJson: string;
  subtotal: number;
  shipping: number;
  total: number;
}): TransactionPayload {
  const items = (() => {
    try {
      const parsed = JSON.parse(form.itemsJson || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();
  return {
    invoiceId: String(form.invoiceId || "").trim(),
    method: String(form.method || "").trim(),
    status: form.status,
    billing: {
      firstName: String(form.billingFirstName || "").trim(),
      email: String(form.billingEmail || "").trim(),
    },
    billingDate: String(form.billingDate || "").trim(),
    dueDate: form.dueDate ? String(form.dueDate) : null,
    items,
    subtotal: Number(form.subtotal || 0),
    shipping: Number(form.shipping || 0),
    total: Number(form.total || 0),
  };
}
