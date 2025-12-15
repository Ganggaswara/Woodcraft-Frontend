"use client";
import { createContext, useContext, useMemo } from "react";
import { addToCart, clearCart, getCart, setCart, subtotal, type CartItem } from "../../lib/cart";
import { cartSubscribe, cartGetSnapshot, cartGetServerSnapshot } from "../../lib/cartStore";
import { useSyncExternalStore } from "react";

type CartContextValue = {
  items: CartItem[];
  subtotal: number;
  add: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(cartSubscribe, cartGetSnapshot, cartGetServerSnapshot) as CartItem[];
  const value = useMemo<CartContextValue>(() => ({
    items,
    subtotal: subtotal(items),
    add: (item) => { addToCart(item); if (typeof window !== "undefined") window.dispatchEvent(new Event("cart:updated")); },
    updateQty: (id, qty) => {
      const curr = getCart();
      const next = curr.map((it) => (it.id === id ? { ...it, qty } : it));
      setCart(next);
      if (typeof window !== "undefined") window.dispatchEvent(new Event("cart:updated"));
    },
    remove: (id) => {
      const curr = getCart();
      const next = curr.filter((x) => x.id !== id);
      setCart(next);
      if (typeof window !== "undefined") window.dispatchEvent(new Event("cart:updated"));
    },
    clear: () => { clearCart(); if (typeof window !== "undefined") window.dispatchEvent(new Event("cart:updated")); },
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

