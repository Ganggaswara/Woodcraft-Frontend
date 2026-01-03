"use client";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api/auth";
import ProductsToolbar from "../components/ProductsToolbar";
import ProductForm from "../components/ProductForm";
import ProductsTable from "../components/ProductsTable";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category?: string;
  rating?: number;
  isNew?: boolean;
  image?: string;
  description?: string;
};

type ApiProduct = {
  id: number | string;
  name: string;
  slug: string;
  price: number | string;
  category?: string;
  rating?: number | string | null;
  isNew?: boolean | number;
  image?: string;
  description?: string;
};

export default function ProductsSection() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<{ id: number } | null>(null);
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "",
    image: "",
    rating: undefined,
    isNew: false,
    description: "",
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await apiFetch("/api/v1/products");
        const raw = (res as { items?: unknown }).items;
        const list: ApiProduct[] = Array.isArray(raw) ? (raw as ApiProduct[]) : [];
        const mapped: Product[] = list.map((p: ApiProduct) => ({
          id: Number(p.id),
          name: String(p.name),
          slug: String(p.slug),
          price: Number(p.price),
          category: p.category ? String(p.category) : undefined,
          rating: p.rating != null ? Number(p.rating) : undefined,
          isNew: !!p.isNew,
          image: p.image ? String(p.image) : undefined,
        }));
        if (mounted) setItems(mapped);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load products";
        toast.error(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      it.name.toLowerCase().includes(q) ||
      (it.category || "").toLowerCase().includes(q) ||
      it.slug.toLowerCase().includes(q)
    );
  }, [items, query]);

  function openCreate() {
    setEditing(null);
    setForm({ name: "", price: 0, category: "", image: "", rating: undefined, isNew: false, description: "" });
    setShowForm(true);
  }

  function openEdit(row: {
    id: number;
    name: string;
    price: number;
    category?: string;
    image?: string;
    rating?: number;
    isNew?: boolean;
    description?: string;
  }) {
    setEditing({ id: row.id });
    setForm({
      name: row.name,
      price: row.price,
      category: row.category || "",
      image: row.image || "",
      rating: row.rating,
      isNew: !!row.isNew,
      description: row.description || "",
    });
    setShowForm(true);
  }

  async function submitForm() {
    const payload = {
      name: String(form.name || "").trim(),
      price: Number(form.price || 0),
      category: (form.category || "") || null,
      image: (form.image || "") || null,
      rating: form.rating != null ? Number(form.rating) : null,
      isNew: !!form.isNew,
      description: (form.description || "") || null,
    };
    if (!payload.name || Number.isNaN(payload.price)) {
      toast.error("Nama dan harga wajib diisi");
      return;
    }
    try {
      if (editing) {
        const updated = await apiFetch(`/api/v1/products/${editing.id}`, { method: "PUT", body: JSON.stringify(payload) });
        setItems((prev) => prev.map((it) => (it.id === editing.id ? { ...it, ...updated } : it)));
        toast.success("Produk diperbarui");
      } else {
        const created = await apiFetch("/api/v1/products", { method: "POST", body: JSON.stringify(payload) });
        const newItem: Product = {
          id: Number(created.id),
          slug: String(created.slug),
          name: payload.name,
          price: payload.price,
          category: payload.category || undefined,
          image: payload.image || undefined,
          rating: payload.rating != null ? Number(payload.rating) : undefined,
          isNew: !!payload.isNew,
          description: payload.description || undefined,
        };
        setItems((prev) => [...prev, newItem]);
        toast.success("Produk dibuat");
      }
      setShowForm(false);
      setEditing(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan produk";
      toast.error(msg);
    }
  }

  async function remove(id: number) {
    if (!confirm("Hapus produk ini?")) return;
    try {
      await apiFetch(`/api/v1/products/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((x) => x.id !== id));
      toast.success("Produk dihapus");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus produk";
      toast.error(msg);
    }
  }

  const field = "px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]";

  return (
    <section className="bg-[#FAF6EF]">
      <div className="p-6 lg:p-8">
        <div className="text-2xl font-extrabold tracking-tight text-[#2a1a13]">Products</div>
        <div className="mt-4">
          <ProductsToolbar
            query={query}
            setQuery={setQuery}
            onAdd={openCreate}
            onRefresh={() => {
              setLoading(true);
              apiFetch("/api/v1/products")
                .then((res) => setItems((res?.items || []) as Product[]))
                .catch((err) => toast.error(err instanceof Error ? err.message : "Refresh gagal"))
                .finally(() => setLoading(false));
            }}
          />
        </div>

        {showForm && (
          <ProductForm
            form={{
              name: String(form.name || ""),
              price: Number(form.price || 0),
              category: String(form.category || ""),
              image: String(form.image || ""),
              rating: form.rating != null ? Number(form.rating) : undefined,
              isNew: !!form.isNew,
              description: String(form.description || ""),
            }}
            setForm={(updater) => {
              setForm((prev) => updater({
                name: String(prev.name || ""),
                price: Number(prev.price || 0),
                category: String(prev.category || ""),
                image: String(prev.image || ""),
                rating: prev.rating != null ? Number(prev.rating) : undefined,
                isNew: !!prev.isNew,
                description: String(prev.description || ""),
              }));
            }}
            editing={!!editing}
            onSubmit={submitForm}
            onCancel={() => { setShowForm(false); setEditing(null); }}
            fieldClass={field}
          />
        )}

        <ProductsTable
          rows={filtered}
          loading={loading}
          onEdit={(row) => openEdit(row)}
          onDelete={(id) => remove(id)}
        />
      </div>
    </section>
  );
}
