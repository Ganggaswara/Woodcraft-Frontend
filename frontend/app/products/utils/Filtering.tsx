export type SortKey = "popular" | "price-low" | "price-high" | "rating" | "name";

type BaseItem = {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
};

export function getCategories<T extends { category: string }>(list: T[]): string[] {
  return Array.from(new Set(list.map((x) => x.category))).sort();
}

export function filterProducts<T extends { category: string; name: string; description: string }>(list: T[], category: string, query: string): T[] {
  let out = list.slice();
  if (category !== "all") out = out.filter((p) => p.category === category);
  const q = query.trim().toLowerCase();
  if (q) out = out.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  return out;
}

export function sortProducts<T extends BaseItem>(list: T[], sort: SortKey): T[] {
  const out = list.slice();
  switch (sort) {
    case "price-low":
      out.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      out.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "name":
      out.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      out.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
  }
  return out;
}

export function applyProductQuery<T extends BaseItem>(list: T[], args: { category: string; query: string; sort: SortKey }): T[] {
  const filtered = filterProducts(list, args.category, args.query);
  return sortProducts(filtered, args.sort);
}
