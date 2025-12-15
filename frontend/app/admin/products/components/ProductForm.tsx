"use client";
type FormState = {
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number | undefined;
  isNew: boolean;
  description: string;
};

type Props = {
  form: FormState;
  setForm: (updater: (f: FormState) => FormState) => void;
  editing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  fieldClass?: string;
};

export default function ProductForm({ form, setForm, editing, onSubmit, onCancel, fieldClass }: Props) {
  const field = fieldClass || "px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]";
  return (
    <div className="mt-4 rounded-2xl bg-white border border-[#E8D9C6] p-5">
      <div className="text-[#2a1a13] font-semibold">{editing ? "Edit Product" : "Add New Product"}</div>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <input className={field} placeholder="Name" value={form.name || ""} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        <input className={field} placeholder="Price (integer)" type="number" value={String(form.price ?? 0)} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} />
        <input className={field} placeholder="Category" value={form.category || ""} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
        <input className={field} placeholder="Image URL" value={form.image || ""} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
        <input className={field} placeholder="Rating (0-5)" type="number" step="0.1" value={String(form.rating ?? "")} onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value ? Number(e.target.value) : undefined }))} />
        <select className={field} value={form.isNew ? "yes" : "no"} onChange={(e) => setForm((f) => ({ ...f, isNew: e.target.value === "yes" }))}>
          <option value="no">Is New: No</option>
          <option value="yes">Is New: Yes</option>
        </select>
        <textarea className={`${field} sm:col-span-2`} placeholder="Description" value={form.description || ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
      </div>
      <div className="mt-4 flex gap-3">
        <button onClick={onSubmit} className="px-4 py-2 rounded-md bg-[#5C3D2E] text-white font-semibold">{editing ? "Save" : "Create"}</button>
        <button onClick={onCancel} className="px-4 py-2 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13]">Cancel</button>
      </div>
    </div>
  );
}
