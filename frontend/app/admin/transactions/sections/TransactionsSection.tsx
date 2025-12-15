 "use client";
import { useEffect, useMemo, useState } from "react";
import TransactionsFilters from "../components/TransactionsFilters";
import TransactionsTable, { type TxRow } from "../components/TransactionsTable";
import TransactionForm from "../components/TransactionForm";
import toast from "react-hot-toast";
import { applyFilters, deriveYears, isValidStatus } from "../utils/filtering";
import { listTransactions, getTransaction, createTransaction, updateTransaction, deleteTransactionByRow } from "../utils/api";
import { mapApiListToRows, mapApiTransactionToRow, buildPayload } from "../utils/mappers";

export default function TransactionsSection() {
  const [items, setItems] = useState<TxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "paid" | "pending" | "failed">("all");
  const [month, setMonth] = useState<string>("all");
  const [year, setYear] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TxRow | null>(null);
  const [form, setForm] = useState<{
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
  }>({
    invoiceId: "",
    method: "",
    status: "pending",
    billingFirstName: "",
    billingEmail: "",
    billingDate: "",
    dueDate: "",
    itemsJson: "[]",
    subtotal: 0,
    shipping: 0,
    total: 0,
  });

  useEffect(() => {
    let mounted = true;
    listTransactions()
      .then((list) => {
        if (!mounted) return;
        setItems(mapApiListToRows(list));
      })
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => applyFilters(items, { query, status, month, year }), [items, query, status, month, year]);

  const years = useMemo(() => deriveYears(items), [items]);

  function openCreate() {
    setEditing(null);
    setForm({
      invoiceId: "",
      method: "",
      status: "pending",
      billingFirstName: "",
      billingEmail: "",
      billingDate: "",
      dueDate: "",
      itemsJson: "[]",
      subtotal: 0,
      shipping: 0,
      total: 0,
    });
    setShowForm(true);
  }

  async function openEdit(row: TxRow) {
    setEditing(row);
    try {
      const detail = await getTransaction(row.id);
      const invoiceId = String((detail as Record<string, unknown>).invoiceId || row.invoiceId || row.id || "");
      const method = String((detail as Record<string, unknown>).method || row.method || "");
      const statusStr = String((detail as Record<string, unknown>).status || "").toLowerCase();
      const statusVal = statusStr === "paid" ? "paid" : statusStr === "failed" ? "failed" : "pending";
      const billingFirstName = String((detail as Record<string, unknown>).billingFirstName || row.customer || "");
      const billingEmail = String((detail as Record<string, unknown>).billingEmail || "");
      const billingDate = String((detail as Record<string, unknown>).billingDate || row.date || "");
      const dueDate = String((detail as Record<string, unknown>).dueDate || "");
      const itemsJson = String((detail as Record<string, unknown>).itemsJson || "[]");
      const subtotal = Number((detail as Record<string, unknown>).subtotal ?? 0);
      const shipping = Number((detail as Record<string, unknown>).shipping ?? 0);
      const total = Number((detail as Record<string, unknown>).total ?? 0);
      setForm({ invoiceId, method, status: statusVal, billingFirstName, billingEmail, billingDate, dueDate, itemsJson, subtotal, shipping, total });
      setShowForm(true);
    } catch {
      setForm({
        invoiceId: row.invoiceId || row.id,
        method: row.method,
        status: row.status === "Paid" ? "paid" : row.status === "Failed" ? "failed" : "pending",
        billingFirstName: row.customer,
        billingEmail: "",
        billingDate: row.date,
        dueDate: "",
        itemsJson: "[]",
        subtotal: 0,
        shipping: 0,
        total: row.amount,
      });
      setShowForm(true);
    }
  }

  async function submitForm() {
    const payload = buildPayload(form);
    if (!payload.invoiceId || !payload.method || !payload.billingDate || !Array.isArray(payload.items)) {
      toast.error("invoiceId, method, billingDate, dan items wajib diisi");
      return;
    }
    if (!isValidStatus(payload.status)) {
      toast.error("Status pembayaran tidak valid");
      return;
    }
    setLoading(true);
    try {
      if (editing) {
        const updated = await updateTransaction(editing.numericId || editing.id, payload);
        const updatedRow = mapApiTransactionToRow(updated);
        setItems((prev) => prev.map((r) => (r.id === editing.id ? updatedRow : r)));
        toast.success("Transaksi diperbarui");
      } else {
        const created = await createTransaction(payload);
        const newRow: TxRow = {
          id: String(created.invoiceId || form.invoiceId),
          customer: form.billingFirstName || "-",
          date: form.billingDate || new Date().toISOString(),
          method: form.method,
          status: form.status === "paid" ? "Paid" : form.status === "failed" ? "Failed" : "Pending",
          amount: Number(form.total || 0),
          numericId: Number(created.id || 0) || undefined,
          invoiceId: String(created.invoiceId || form.invoiceId),
        };
        setItems((prev) => [newRow, ...prev]);
        toast.success("Transaksi dibuat");
      }
      setShowForm(false);
      setEditing(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan transaksi";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function remove(row: TxRow) {
    if (!confirm("Hapus transaksi ini?")) return;
    setLoading(true);
    try {
      await deleteTransactionByRow(row);
      setItems((prev) => prev.filter((r) => r.id !== row.id));
      toast.success("Transaksi dihapus");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus transaksi";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const field = "px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]";

  return (
    <section className="bg-[#FAF6EF]">
      <div className="p-6 lg:p-8">
        <div className="text-2xl font-extrabold tracking-tight text-[#2a1a13]">Transactions</div>
        <div className="mt-4">
          <TransactionsFilters
            query={query}
            setQuery={setQuery}
            status={status}
            setStatus={setStatus}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            years={years}
          />
        </div>
        {showForm && (
          <TransactionForm
            form={form}
            setForm={setForm}
            editing={!!editing}
            onSubmit={submitForm}
            onCancel={() => { setShowForm(false); setEditing(null); }}
            fieldClass={field}
          />
        )}
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <button onClick={openCreate} className="px-4 py-2 rounded-md bg-[#5C3D2E] text-white font-semibold">Add New</button>
            <button
              onClick={() => {
                setLoading(true);
                listTransactions()
                  .then((list) => setItems(mapApiListToRows(list)))
                  .finally(() => setLoading(false));
              }}
              className="px-4 py-2 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold"
            >
              Refresh
            </button>
          </div>
          <div className="mt-4">
            <TransactionsTable
              rows={filtered}
              loading={loading}
              onEdit={openEdit}
              onDelete={remove}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
