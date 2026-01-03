"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "./Sidebar";
import ProductGrid from "./ProductGrid";
import { applyProductQuery, getCategories, SortKey } from "../utils/Filtering";
import { fetchProducts, type ProductItem } from "../../../lib/api/products";

export default function Catalog() {
  const [items, setItems] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const initialCategory = useSearchParams().get("category") ?? "all";
  const [category, setCategory] = useState<string>(initialCategory);
  const [sort, setSort] = useState<SortKey>("popular");

  useEffect(() => {
    fetchProducts()
      .then((list) => {
        setItems(list);
        setCategories(getCategories(list));
      })
      .catch(() => {
        setItems([]);
        setCategories([]);
      });
  }, []);

  // derived from URL on mount

  const filtered = useMemo(() => applyProductQuery(items, { category, query, sort }), [items, category, query, sort]);

  return (
    <section className="bg-[#FAF6EF]">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <div>
          <Sidebar
            categories={categories}
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />
        </div>
        <div className="md:col-start-2 col-span-1">
          <ProductGrid items={filtered} />
        </div>
      </div>
    </section>
  );
}
