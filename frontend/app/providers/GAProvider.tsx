"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "../../lib/analytics";

export default function GAProvider() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    pageview(pathname);
  }, [pathname]);
  return null;
}
