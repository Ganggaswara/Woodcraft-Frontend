import { Timer, Truck, ShieldCheck } from "lucide-react";
import Reveal from "../utils/Reveal";

export default function StatBand() {
  const items = [
    {
      title: "DISPATCH",
      text: "We will dispatch your product within 2–3 weeks",
      Icon: Timer,
    },
    {
      title: "DELIVERY",
      text: "We will deliver your products and take care of the installation",
      Icon: Truck,
    },
    {
      title: "GUARANTEE",
      text: "We offer a guarantee on all our products",
      Icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative text-white">
      <div className="absolute inset-0 bg-[#4A1F1A]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.45) 0 48px, transparent 48px 96px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-10 grid gap-10 md:grid-cols-3">
        {items.map(({ title, text, Icon }, i) => {
          const dirs = ["up", "left", "right"] as const;
          return (
          <Reveal key={title} direction={dirs[i % dirs.length]} duration={800}>
            <div className="flex items-start gap-4">
              <Icon className="h-9 w-9 text-[#D6B48A]" strokeWidth={2} />
              <div>
                <div className="text-lg sm:text-xl font-bold uppercase tracking-wide">{title}</div>
                <div className="mt-1 text-sm text.white/80 max-w-xs">{text}</div>
              </div>
            </div>
          </Reveal>
        );})}
      </div>
    </section>
  );
}
