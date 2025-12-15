"use client";
import { useEffect, useMemo, useState } from "react";
import UsersToolbar from "../components/UsersToolbar";
import UsersTable from "../components/UsersTable";
import { apiFetch } from "@/lib/api/auth";

type UserRow = { id: number; name: string; email: string; role: "admin" | "customer" };

export default function UsersSection() {
  const [items, setItems] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<UserRow | null>(null);
  const [form, setForm] = useState<{ name: string; email: string; password: string; role: "admin" | "customer" }>({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiFetch("/api/v1/users")
      .then((res) => {
        if (!mounted) return;
        const raw = (res as { users?: unknown }).users;
        const list = Array.isArray(raw) ? (raw as { id: number; name: string; email: string; role?: string }[]) : [];
        const mapped: UserRow[] = list.map((u) => ({
          id: Number(u.id),
          name: String(u.name),
          email: String(u.email || ""),
          role: (u.role === "admin" ? "admin" : "customer"),
        }));
        setItems(mapped);
      })
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? items.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      : items;
    if (role === "all") return base;
    return base.filter((u) => u.role === (role as "admin" | "customer"));
  }, [items, query, role]);

  function openInvite() {
    setEditing(null);
    setForm({ name: "", email: "", password: "", role: "customer" });
    setShowForm(true);
  }

  function openEdit(row: UserRow) {
    setEditing(row);
    setForm({ name: row.name, email: row.email, password: "", role: row.role });
    setShowForm(true);
  }

  async function submit() {
    const payload = {
      name: String(form.name || "").trim(),
      email: String(form.email || "").trim(),
      password: String(form.password || "").trim(),
      role: form.role,
    };
    if (!payload.name || !payload.email || (!editing && !payload.password)) return;
    setLoading(true);
    try {
      if (editing) {
        const updated = await apiFetch(`/api/v1/users/${editing.id}`, { method: "PUT", body: JSON.stringify({ name: payload.name, email: payload.email, role: payload.role }) });
        setItems((prev) => prev.map((u) => (u.id === editing.id ? { id: updated.user.id, name: updated.user.name, email: updated.user.email, role: updated.user.role } : u)));
      } else {
        const created = await apiFetch("/api/v1/auth/signup", { method: "POST", body: JSON.stringify(payload) });
        const newUser = created?.user as { id: number; name: string; email: string };
        setItems((prev) => [...prev, { id: Number(newUser.id), name: newUser.name, email: newUser.email, role: "customer" }]);
      }
      setShowForm(false);
      setEditing(null);
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this user?")) return;
    setLoading(true);
    try {
      await apiFetch(`/api/v1/users/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((u) => u.id !== id));
    } finally {
      setLoading(false);
    }
  }

  const field = "px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]";

  return (
    <section className="bg-[#FAF6EF]">
      <div className="p-6 lg:p-8">
        <div className="text-2xl font-extrabold tracking-tight text-[#2a1a13]">Users</div>
        <div className="mt-4">
          <UsersToolbar query={query} setQuery={setQuery} role={role} setRole={setRole} onInvite={openInvite} />
        </div>
        {showForm && (
          <div className="mt-4 rounded-2xl bg-white border border-[#E8D9C6] p-5">
            <div className="text-[#2a1a13] font-semibold">{editing ? "Edit User" : "Invite User"}</div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <input className={field} placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              <input className={field} placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
              <input className={field} placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
              <select className={field} value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as "admin" | "customer" }))}>
                <option value="customer">Role: Customer</option>
                <option value="admin">Role: Admin</option>
              </select>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={submit} className="px-4 py-2 rounded-md bg-[#5C3D2E] text-white font-semibold">{editing ? "Save" : "Create"}</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13]">Cancel</button>
            </div>
          </div>
        )}
        <div className="mt-4">
          <UsersTable
            rows={filtered.map((u) => ({ id: String(u.id), name: u.name, email: u.email, role: u.role, status: "active" }))}
            loading={loading}
            onEdit={(row) => openEdit({ id: Number(row.id), name: row.name, email: row.email, role: row.role })}
            onDelete={(id) => remove(Number(id))}
          />
        </div>
      </div>
    </section>
  );
}
