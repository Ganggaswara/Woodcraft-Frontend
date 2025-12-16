export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export function pageview(url: string) {
  if (!GA_ID) return;
  if (typeof window === "undefined") return;
  const w = window as any;
  if (!w.gtag) return;
  w.gtag("config", GA_ID, { page_path: url });
}

export function event(name: string, params: Record<string, unknown> = {}) {
  if (!GA_ID) return;
  if (typeof window === "undefined") return;
  const w = window as any;
  if (!w.gtag) return;
  w.gtag("event", name, params);
}
