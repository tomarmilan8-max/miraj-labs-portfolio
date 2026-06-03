import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

const supporters = ["Alisha Rajora", "Nikhil Soni", "Jainam Kapasi", "Rudra Savaliya"];
const track = [...supporters, ...supporters, ...supporters, ...supporters];

export default function Supporters() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-5 sm:py-6">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-medium transition-all px-4 py-2 rounded-[10px]"
          style={{ color: "var(--c-on-dark)", background: "var(--c-on-dark-10)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--c-accent-30)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--c-on-dark-10)")}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "0.12em", color: "var(--c-soft)" }}>
          MIRAJ LABS
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
        <p className="text-xs font-medium uppercase tracking-widest mb-4 text-center"
          style={{ color: "var(--c-soft)", opacity: 0.7 }}>With love &amp; gratitude</p>
        <h1 className="text-center mb-4"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 10vw, 110px)", lineHeight: 0.88, color: "var(--c-on-dark)", letterSpacing: "0.02em" }}>
          Our Supporters
        </h1>
        <p className="text-sm sm:text-base text-center max-w-md mb-12 sm:mb-16 px-6"
          style={{ color: "var(--c-on-dark-55)", lineHeight: 1.6 }}>
          The people who believed in us before we built anything worth believing in.
        </p>

        <div className="w-full overflow-hidden select-none mb-3">
          <div className="marquee-track marquee-left">
            {track.map((name, i) => (
              <span key={i}
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 8vw, 100px)", letterSpacing: "0.04em", lineHeight: 1, color: i % 2 === 0 ? "var(--c-on-dark)" : "var(--c-accent)", marginRight: "clamp(36px, 6vw, 80px)", display: "inline-block", whiteSpace: "nowrap" }}>
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden select-none">
          <div className="marquee-track marquee-right">
            {[...track].reverse().map((name, i) => (
              <span key={i}
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "0.06em", lineHeight: 1, color: i % 2 === 0 ? "var(--c-on-dark-25)" : "var(--c-accent-30)", marginRight: "clamp(24px, 4vw, 60px)", display: "inline-block", whiteSpace: "nowrap" }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center py-6 sm:py-8">
        <p className="text-xs" style={{ color: "var(--c-on-dark-30)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.1em" }}>
          MIRAJ LABS 2026 · GUJARAT, INDIA
        </p>
      </div>

      <style>{`
        .marquee-track { display: inline-flex; white-space: nowrap; }
        .marquee-left  { animation: marquee-left 18s linear infinite; }
        .marquee-right { animation: marquee-right 22s linear infinite; }
        @keyframes marquee-left  { 0% { transform: translateX(0); }   100% { transform: translateX(-50%); } }
        @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
