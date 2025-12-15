"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";
  duration?: number;
  threshold?: number;
};

export default function Reveal({ children, className, delay = 0, direction = "up", duration = 700, threshold = 0.15 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const hidden = (() => {
    switch (direction) {
      case "down":
        return "opacity-0 -translate-y-6";
      case "left":
        return "opacity-0 -translate-x-6";
      case "right":
        return "opacity-0 translate-x-6";
      case "fade":
        return "opacity-0";
      case "scale":
        return "opacity-0 scale-95";
      case "blur":
        return "opacity-0 blur-sm";
      default:
        return "opacity-0 translate-y-6";
    }
  })();

  const visibleCls = (() => {
    switch (direction) {
      case "down":
      case "up":
        return "opacity-100 translate-y-0";
      case "left":
      case "right":
        return "opacity-100 translate-x-0";
      case "fade":
        return "opacity-100";
      case "scale":
        return "opacity-100 scale-100";
      case "blur":
        return "opacity-100 blur-0";
      default:
        return "opacity-100";
    }
  })();

  return (
    <div
      ref={ref}
      className={`${visible ? visibleCls : hidden} transition-all will-change-transform ${className ?? ""}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
