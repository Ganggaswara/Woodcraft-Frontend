"use client";
type FormState = {
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
};

type Props = {
  form: FormState;
  setForm: (updater: (f: FormState) => FormState) => void;
  editing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  fieldClass?: string;
};

export default function TransactionForm({ form, setForm, editing, onSubmit, onCancel, fieldClass }: Props) {
  const field = fieldClass || "px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]";
  return (
    <div className="mt-4 rounded-2xl bg-white border border-[#E8D9C6] p-5">
      <div className="text-[#2a1a13] font-semibold">{editing ? "Edit Transaction" : "Create Transaction"}</div>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <input className={field} placeholder="Invoice Id" value={form.invoiceId} onChange={(e) => setForm((f) => ({ ...f, invoiceId: e.target.value }))} />
        <input className={field} placeholder="Method" value={form.method} onChange={(e) => setForm((f) => ({ ...f, method: e.target.value }))} />
        <select className={field} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as FormState["status"] }))}>
          <option value="pending">Status: Pending</option>
          <option value="paid">Status: Paid</option>
          <option value="failed">Status: Failed</option>
        </select>
        <input className={field} placeholder="Billing First Name" value={form.billingFirstName} onChange={(e) => setForm((f) => ({ ...f, billingFirstName: e.target.value }))} />
        <input className={field} placeholder="Billing Email" value={form.billingEmail} onChange={(e) => setForm((f) => ({ ...f, billingEmail: e.target.value }))} />
        <input className={field} placeholder="Billing Date (YYYY-MM-DD)" value={form.billingDate} onChange={(e) => setForm((f) => ({ ...f, billingDate: e.target.value }))} />
        <input className={field} placeholder="Due Date (YYYY-MM-DD)" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
        <input className={field} placeholder="Subtotal" type="number" value={String(form.subtotal)} onChange={(e) => setForm((f) => ({ ...f, subtotal: Number(e.target.value) }))} />
        <input className={field} placeholder="Shipping" type="number" value={String(form.shipping)} onChange={(e) => setForm((f) => ({ ...f, shipping: Number(e.target.value) }))} />
        <input className={field} placeholder="Total" type="number" value={String(form.total)} onChange={(e) => setForm((f) => ({ ...f, total: Number(e.target.value) }))} />
        <textarea className={`${field} sm:col-span-2`} placeholder='Items JSON (e.g. [{"sku":"ABC","qty":1,"price":10000}] )' value={form.itemsJson} onChange={(e) => setForm((f) => ({ ...f, itemsJson: e.target.value }))} />
      </div>
      <div className="mt-4 flex gap-3">
        <button onClick={onSubmit} className="px-4 py-2 rounded-md bg-[#5C3D2E] text-white font-semibold">{editing ? "Save" : "Create"}</button>
        <button onClick={onCancel} className="px-4 py-2 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13]">Cancel</button>
      </div>
    </div>
  );
}
