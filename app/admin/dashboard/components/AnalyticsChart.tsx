"use client";
export default function AnalyticsChart() {
  const points = [12, 18, 15, 22, 28, 24, 30, 34, 29, 35, 40, 38];
  const factor = 3;
  const bars: number[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    bars.push(a);
    for (let k = 1; k <= factor; k++) {
      const t = k / (factor + 1);
      bars.push(Math.round(a + (b - a) * t));
    }
  }
  bars.push(points[points.length - 1]);
  const maxBar = Math.max(...bars);
  return (
    <div className="rounded-2xl bg-white border border-[#E8D9C6] p-5">
      <div className="flex items-center justify-between">
        <div className="text-[#2a1a13] font-semibold">Sales Overview</div>
        <div className="text-xs text-[#7a6555]">Last 12 weeks</div>
      </div>
      <div className="mt-4 h-40 flex items-end justify-between gap-1 overflow-hidden">
        {bars.map((b, i) => (
          <div
            key={i}
            className="rounded-full bg-[#5C3D2E]"
            style={{
              height: `${Math.round((b / maxBar) * 100)}%`,
              width: 6,
            }}
          />
        ))}
      </div>
      <div className="mt-3 text-xs text-[#7a6555]">Growth +8.3% WoW</div>
    </div>
  );
}
