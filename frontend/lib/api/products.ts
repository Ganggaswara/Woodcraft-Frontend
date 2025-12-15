export type ProductItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
};

export async function fetchProducts(): Promise<ProductItem[]> {
  const candidates = [
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
    "http://127.0.0.1:5000",
  ];
  type ApiProduct = {
    id: number | string;
    slug: string;
    name: string;
    description?: string;
    price: number | string;
    image: string;
    category: string;
    rating?: number | string | null;
    isNew?: boolean | number;
  };
  let data: { items: ApiProduct[] } = { items: [] };
  for (const base of candidates) {
    try {
      const res = await fetch(`${base}/api/v1/products`, { cache: "no-store" });
      if (!res.ok) continue;
      const json = await res.json();
      data = { items: Array.isArray(json.items) ? json.items : [] };
      if (Array.isArray(data.items) && data.items.length) break;
    } catch {
      // try next candidate
    }
  }
  const list: ProductItem[] = (data.items || []).map((p: ApiProduct) => ({
    id: String(p.id),
    slug: p.slug,
    name: p.name,
    description: p.description || "",
    price: Number(p.price),
    image: p.image,
    category: String(p.category),
    rating: p.rating != null ? Number(p.rating) : undefined,
    isNew: !!p.isNew,
  }));
  return list;
}

export async function fetchProductBySlug(slug: string): Promise<ProductItem | null> {
  const candidates = [
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
    "http://127.0.0.1:5000",
  ];
  for (const base of candidates) {
    try {
      const res = await fetch(`${base}/api/v1/products/${slug}`, { cache: "no-store" });
      if (!res.ok) continue;
      const item = await res.json();
      return {
        id: String(item.id),
        slug: item.slug,
        name: item.name,
        description: item.description || "",
        price: Number(item.price),
        image: item.image,
        category: String(item.category),
        rating: item.rating != null ? Number(item.rating) : undefined,
        isNew: !!item.isNew,
      };
    } catch {
      // try next
    }
  }
  try {
    const list = await fetchProducts();
    return list.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}

export async function fetchRelatedProducts(slug: string, count = 4): Promise<ProductItem[]> {
  try {
    const list = await fetchProducts();
    const base = list.filter((p) => p.slug !== slug);
    return base.slice(0, count);
  } catch {
    return [];
  }
}
