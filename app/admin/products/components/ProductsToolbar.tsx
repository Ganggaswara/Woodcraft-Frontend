"use client";
type Props = {
  query: string;
  setQuery: (v: string) => void;
  onAdd: () => void;
  onRefresh: () => void;
};

export default function ProductsToolbar({ query, setQuery, onAdd, onRefresh }: Props) {
  return (
    <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
        className="px-3 py-2 rounded-md bg-white border border-[#E8D9C6] text-[#2a1a13]"
      />
      <button onClick={onAdd} className="px-4 py-2 rounded-md bg-[#5C3D2E] text-white font-semibold">Add New</button>
      <button onClick={onRefresh} className="px-4 py-2 rounded-md bg-[#D6B48A] text-[#2a1a13] font-semibold">Refresh</button>
    </div>
  );
}
