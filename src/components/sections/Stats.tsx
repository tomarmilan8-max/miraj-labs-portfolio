import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useProjects } from "@/contexts/ProjectContext";

function StatCounter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1600;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col gap-3 p-6 sm:p-8 md:p-10"
      style={{ borderRight: "1px solid var(--c-accent-12)" }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.88, color: "var(--c-accent)" }}>
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm font-medium uppercase tracking-widest"
        style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif", opacity: 0.7 }}>
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  const { stats } = useProjects();

  return (
    <section className="w-full border-y" style={{ background: "var(--c-pale)", borderColor: "var(--c-accent-15)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <StatCounter value={stats.websites}     suffix="+" label="Websites Delivered" />
          <StatCounter value={stats.industries}           label="Industries Served" />
          <StatCounter value={stats.satisfaction} suffix="%" label="Client Satisfaction" />
        </div>
      </div>
    </section>
  );
}
