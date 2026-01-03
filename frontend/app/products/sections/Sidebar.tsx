"use client";
import Reveal from "../../utils/Reveal";
import { SortKey } from "../utils/Filtering";

type Props = {
  categories: string[];
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
};

export default function Sidebar({ categories, query, setQuery, category, setCategory, sort, setSort }: Props) {
  return (
    <aside className="bg-white rounded-2xl border border-[#E8D9C6] p-4 sm:p-8 sticky top-20 h-max shadow-xl md:-ml-4 lg:-ml-6">
      <Reveal direction="up" duration={700}>
        <div className="text-sm uppercase tracking-widest text-[#D6B48A]">Filters</div>
        <div className="mt-4 space-y-8">
          <div>
            <label className="text-sm font-semibold text-[#2a1a13] mb-2 block">Search Products</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-2 rounded-md bg-[#FAF6EF] text-[#2a1a13] placeholder:text-[#7a6555] placeholder:opacity-60 border border-[#E8D9C6] focus:outline-none focus:ring-2 focus:ring-[#D6B48A]/40"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#2a1a13] mb-2 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#FAF6EF] text-[#2a1a13] border border-[#E8D9C6]"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#2a1a13] mb-2 block">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="w-full px-3 py-2 rounded-md bg-[#FAF6EF] text-[#2a1a13] border border-[#E8D9C6]"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Lowest Price</option>
              <option value="price-high">Highest Price</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>

          
        </div>
      </Reveal>
    </aside>
  );
}
