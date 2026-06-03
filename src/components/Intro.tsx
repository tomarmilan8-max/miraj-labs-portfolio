import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2000);
    const t2 = setTimeout(() => { setHidden(true); onComplete(); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (hidden) return null;

  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {!hidden && (
        <>
          <motion.div className="fixed inset-x-0 top-0 z-[300] origin-top"
            style={{ height: "50vh", background: "var(--c-bg)" }}
            initial={{ scaleY: 1 }}
            animate={phase === "exit" ? { scaleY: 0, transition: { duration: 0.65, ease } } : {}} />
          <motion.div className="fixed inset-x-0 bottom-0 z-[300] origin-bottom"
            style={{ height: "50vh", background: "var(--c-bg)" }}
            initial={{ scaleY: 1 }}
            animate={phase === "exit" ? { scaleY: 0, transition: { duration: 0.65, ease } } : {}} />

          <motion.div
            className="fixed inset-0 z-[301] flex flex-col items-center justify-center pointer-events-none select-none"
            animate={phase === "exit" ? { opacity: 0, transition: { duration: 0.3 } } : {}}>
            <div className="overflow-hidden">
              <motion.div
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(72px, 16vw, 200px)", lineHeight: 0.88, color: "var(--c-dark)", letterSpacing: "0.03em" }}
                initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.1 }}>
                MIRAJ
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(72px, 16vw, 200px)", lineHeight: 0.88, color: "var(--c-accent)", letterSpacing: "0.03em" }}
                initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.25 }}>
                LABS
              </motion.div>
            </div>
            <div className="overflow-hidden mt-6">
              <motion.p
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", letterSpacing: "0.2em", color: "var(--c-dark)", opacity: 0.6, textTransform: "uppercase" }}
                initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 0.6 }}
                transition={{ duration: 0.5, ease, delay: 0.5 }}>
                We Make You Appear Online
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
