import { getCart, type CartItem } from "./cart";

let snapshot: CartItem[] = [];
const serverSnapshot: CartItem[] = [];

export function cartSubscribe(cb: () => void) {
  if (typeof window !== "undefined") {
    const onUpdate = () => {
      snapshot = getCart();
      cb();
    };
    snapshot = getCart();
    window.addEventListener("cart:updated", onUpdate);
    cb();
    return () => window.removeEventListener("cart:updated", onUpdate);
  }
  return () => {};
}

export function cartGetSnapshot() {
  return snapshot;
}

export function cartGetServerSnapshot(): CartItem[] {
  return serverSnapshot;
}

