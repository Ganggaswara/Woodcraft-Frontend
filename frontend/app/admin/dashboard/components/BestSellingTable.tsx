import { use } from "react";
import { fetchProducts } from "@/lib/api/products";

export default function BestSellingTable() {
  const items = use(fetchProducts());
  const rows = items.slice(0, 6).map((p) => ({
    name: p.name,
    orders: "—",
    status: "ready",
    price: p.price,
  }));

  return (
    <div className="rounded-2xl bg-white border border-[#E8D9C6] overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="text-[#2a1a13] font-semibold">Best selling product</div>
        <button className="px-3 py-1.5 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] text-xs">Filter</button>
      </div>
      <div className="divide-y divide-[#E8D9C6]">
        <div className="grid grid-cols-4 px-5 py-3 text-[#7a6555] text-sm font-semibold">
          <div>Product</div>
          <div>Total Order</div>
          <div>Status</div>
          <div>Price</div>
        </div>
        {rows.length === 0 && (
          <div className="px-5 py-6 text-[#7a6555]">No products</div>
        )}
        {rows.map((row) => (
          <div key={row.name} className="grid grid-cols-4 items-center px-5 py-3">
            <div className="text-[#2a1a13]">{row.name}</div>
            <div className="text-[#2a1a13] ml-10">{row.orders}</div>
            <div className="text-xs">
              <span
                className={
                  "inline-flex items-center rounded-full px-2 py-1 border border-[#E8D9C6] text-[#7a6555]"
                }
              >
                {row.status}
              </span>
            </div>
            <div className="text-[#2a1a13]">Rp {row.price.toLocaleString("id-ID")}</div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 text-right">
        <button className="px-3 py-1.5 rounded-md bg-[#FAF6EF] border border-[#E8D9C6] text-[#2a1a13] text-xs">Details</button>
      </div>
    </div>
  );
}
