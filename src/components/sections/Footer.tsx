import { Github, Heart } from "lucide-react";
import { useLocation } from "wouter";

export default function Footer() {
  const [, navigate] = useLocation();

  return (
    <footer className="py-6 sm:py-7 border-t" style={{ background: "var(--c-bg)", borderColor: "var(--c-dark-10)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "0.12em", color: "var(--c-dark)" }}>
          MIRAJ LABS 2026
        </div>

        <div className="text-xs sm:text-sm italic text-center"
          style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>
          Your customers are already online. Your business should be too.
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => navigate("/supporters")}
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-[10px] transition-all"
            style={{ background: "var(--c-accent-10)", color: "var(--c-accent)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.04em" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--c-on-dark)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-accent-10)"; (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; }}>
            <Heart size={12} /> Our Supporters
          </button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="transition-colors" style={{ color: "var(--c-dark-40)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--c-accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--c-dark-40)")}
            aria-label="GitHub">
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
