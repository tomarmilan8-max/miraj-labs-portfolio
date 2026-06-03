import { motion } from "framer-motion";

interface HeroProps {
  animate: boolean;
  onStartProject: () => void;
}

export default function Hero({ animate, onStartProject }: HeroProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: animate ? 0.1 : 0 } },
  };
  const item = {
    hidden: { y: 60, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden pt-24 pb-16 md:pb-24"
      style={{ background: "var(--c-bg)" }}>
      <div className="absolute inset-x-0 top-[6%] text-center pointer-events-none select-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(80px, 20vw, 280px)",
          lineHeight: 0.82,
          color: "var(--c-accent-06)",
          letterSpacing: "0.02em",
        }}
        aria-hidden="true">
        APPEAR<br />ONLINE
      </div>

      <div className="absolute top-[15%] right-[8%] w-64 h-64 md:w-72 md:h-72 rounded-full pointer-events-none animate-float-slow"
        style={{ background: "var(--c-accent-10)", filter: "blur(60px)" }} />
      <div className="absolute bottom-[20%] left-[5%] w-48 h-48 md:w-56 md:h-56 rounded-full pointer-events-none animate-float-slower"
        style={{ background: "var(--c-dark-10)", filter: "blur(50px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 py-1.5 rounded-[10px]"
            style={{ background: "var(--c-pale)" }}>
            <span className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>
              Est. 2026 · India · Gujarat Funded
            </span>
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h1 variants={item}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 12vw, 160px)", lineHeight: 0.88, color: "var(--c-dark)", letterSpacing: "0.01em" }}>
              We Make You
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h1 variants={item}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 12vw, 160px)", lineHeight: 0.88, color: "var(--c-accent)", letterSpacing: "0.01em" }}>
              Appear Online
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-10">
            <motion.p variants={item}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 5vw, 80px)", lineHeight: 0.9, color: "var(--c-dark-30)", letterSpacing: "0.01em" }}>
              and the world will come.
            </motion.p>
          </div>

          <motion.div variants={item} className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
            <p className="max-w-md text-sm sm:text-base"
              style={{ color: "var(--c-dark-65)", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
              Two 19-year-old commerce students turning businesses into digital success stories — one website at a time.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo("work")}
                className="px-6 py-3.5 sm:px-7 sm:py-4 font-medium transition-all"
                style={{ background: "var(--c-accent)", color: "var(--c-on-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontSize: "15px" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                View Our Work
              </button>
              <button onClick={onStartProject}
                className="px-6 py-3.5 sm:px-7 sm:py-4 font-medium transition-all border"
                style={{ background: "transparent", color: "var(--c-dark)", borderColor: "var(--c-dark-25)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontSize: "15px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-dark)"; (e.currentTarget as HTMLElement).style.color = "var(--c-on-dark)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--c-dark)"; }}>
                Start a Project
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
