"use client";

type Row = { id: string; name: string; email: string; role: "admin" | "customer"; status: "active" | "suspended" };

type Props = {
  rows: Row[];
  loading: boolean;
  onEdit: (row: Row) => void;
  onDelete: (id: string) => void;
};

export default function UsersTable({ rows, loading, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-2xl bg-white border border-[#E8D9C6] overflow-hidden">
      <div className="grid grid-cols-5 px-5 py-3 text-[#7a6555] text-sm font-semibold">
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>Status</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="divide-y divide-[#E8D9C6]">
        {loading && (
          <div className="px-5 py-6 text-[#7a6555]">Loading…</div>
        )}
        {!loading && rows.map((row) => (
          <div key={row.id} className="grid grid-cols-5 items-center px-5 py-4">
            <div className="text-[#2a1a13] font-medium">{row.name}</div>
            <div className="text-[#2a1a13]">{row.email}</div>
            <div className="text-[#2a1a13] capitalize">{row.role}</div>
            <div className="text-xs">
              <span className={"inline-flex items-center rounded-full px-2 py-1 border " + (row.status === "active" ? "border-emerald-300 text-[#2a1a13]" : "border-[#E8D9C6] text-red-600")}>
                {row.status}
              </span>
            </div>
            <div className="text-right">
              <div className="inline-flex gap-2">
                <button onClick={() => onEdit(row)} className="px-2 py-1 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] text-sm">Edit</button>
                <button onClick={() => onDelete(row.id)} className="px-2 py-1 rounded-md bg-[#E36A5D] text-white text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {!loading && rows.length === 0 && (
          <div className="px-5 py-6 text-[#7a6555]">No users</div>
        )}
      </div>
    </div>
  );
}
