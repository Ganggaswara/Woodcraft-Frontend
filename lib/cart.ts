export type CartItem = { id: string; slug?: string; name: string; price: number; qty: number; image: string };

const KEY = 'cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem) {
  const items = getCart();
  const idx = items.findIndex((x) => x.id === item.id);
  if (idx >= 0) {
    items[idx].qty += item.qty;
  } else {
    items.push(item);
  }
  setCart(items);
}

export function clearCart() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}

export function subtotal(items: CartItem[]) {
  return items.reduce((s, x) => s + x.price * x.qty, 0);
}
