"use client";

type Row = {
  id: number;
  name: string;
  price: number;
  category?: string;
  rating?: number;
  isNew?: boolean;
  image?: string;
};

type Props = {
  rows: Row[];
  loading: boolean;
  onEdit: (row: Row) => void;
  onDelete: (id: number) => void;
};

export default function ProductsTable({ rows, loading, onEdit, onDelete }: Props) {
  return (
    <div className="mt-4 rounded-2xl bg-white border border-[#E8D9C6] overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="text-[#2a1a13] font-semibold">Product List</div>
        {loading && <div className="text-xs text-[#7a6555]">Loading…</div>}
      </div>
      <div className="divide-y divide-[#E8D9C6]">
        <div className="grid grid-cols-7 px-5 py-3 text-[#7a6555] text-sm font-semibold">
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Rating</div>
          <div>Flags</div>
          <div className="ml-20">Image</div>
          <div className="text-right">Actions</div>
        </div>
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-7 items-center px-5 py-3">
            <div className="text-[#2a1a13]">{row.name}</div>
            <div className="text-[#2a1a13]">{row.category || "-"}</div>
            <div className="text-[#2a1a13]">Rp {row.price.toLocaleString("id-ID")}</div>
            <div className="text-[#2a1a13]">{row.rating ?? "-"}</div>
            <div className="text-xs">
              <span className={"inline-flex items-center rounded-full px-2 py-1 border " + (row.isNew ? "border-emerald-300 text-[#2a1a13]" : "border-[#E8D9C6] text-[#7a6555]")}>
                {row.isNew ? "New" : "—"}
              </span>
            </div>
            <div className="text-[#2a1a13] truncate">{row.image || "-"}</div>
            <div className="text-right">
              <div className="inline-flex gap-2">
                <button onClick={() => onEdit(row)} className="px-3 py-1.5 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] text-xs">Edit</button>
                <button onClick={() => onDelete(row.id)} className="px-3 py-1.5 rounded-md bg-red-50 border border-red-200 text-red-600 text-xs">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="px-5 py-10 text-center text-[#7a6555]">No products found</div>
        )}
      </div>
    </div>
  );
}
