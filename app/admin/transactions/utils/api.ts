import { apiFetch } from "@/lib/api/auth";
import type { TxRow } from "../components/TransactionsTable";

export async function listTransactions(): Promise<Record<string, unknown>[]> {
  const res = await apiFetch("/api/v1/transactions");
  const raw = (res as { transactions?: unknown }).transactions;
  const list = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
  return list;
}

export async function getTransaction(idOrInvoice: string): Promise<Record<string, unknown>> {
  const detail = await apiFetch(`/api/v1/transactions/${idOrInvoice}`);
  return detail as Record<string, unknown>;
}

export type TransactionPayload = {
  invoiceId: string;
  method: string;
  status: "pending" | "paid" | "failed";
  billing: { firstName?: string; email?: string };
  billingDate: string;
  dueDate: string | null;
  items: unknown[];
  subtotal: number;
  shipping: number;
  total: number;
};

export async function createTransaction(payload: TransactionPayload): Promise<{ id: number; invoiceId: string }> {
  const created = await apiFetch("/api/v1/transactions", { method: "POST", body: JSON.stringify(payload) });
  return created as { id: number; invoiceId: string };
}

export async function updateTransaction(idOrInvoice: string | number, payload: TransactionPayload): Promise<Record<string, unknown>> {
  const url = `/api/v1/transactions/${idOrInvoice}`;
  const updated = await apiFetch(url, { method: "PUT", body: JSON.stringify(payload) });
  return updated as Record<string, unknown>;
}

export async function deleteTransactionById(id: number): Promise<void> {
  await apiFetch(`/api/v1/transactions/${id}`, { method: "DELETE" });
}

export async function deleteTransactionByRow(row: TxRow): Promise<void> {
  if (row.numericId) {
    await deleteTransactionById(row.numericId);
    return;
  }
  const detail = await getTransaction(row.id);
  const idNum = Number((detail as Record<string, unknown>).id || 0);
  if (idNum) await deleteTransactionById(idNum);
}
