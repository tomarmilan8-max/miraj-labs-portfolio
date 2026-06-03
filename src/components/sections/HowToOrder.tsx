import { motion } from "framer-motion";
import { ClipboardList, MessageCircle, Rocket, Globe } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Fill the Form",
    desc: "Click 'Start a Project' and tell us about your business — what you do, what kind of website you need, and your budget. Takes under 2 minutes.",
    highlight: "Free & no commitment",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "We Call You Back",
    desc: "Within 24 hours Milan or Raj will contact you on WhatsApp or phone to understand your vision, answer questions, and confirm the plan.",
    highlight: "Within 24 hours",
  },
  {
    icon: Rocket,
    number: "03",
    title: "We Build It",
    desc: "Once you approve the quote, we get to work. Most websites are ready in 3–7 days. You'll see a live preview before anything goes public.",
    highlight: "3–7 days delivery",
  },
  {
    icon: Globe,
    number: "04",
    title: "You Go Live",
    desc: "We handle hosting, domain setup, and launch. Your business is now online — and we stay available for edits and support even after launch.",
    highlight: "Full support included",
  },
];

export default function HowToOrder({ onStartProject }: { onStartProject: () => void }) {
  return (
    <section id="how-to-order" className="py-20 md:py-28"
      style={{ background: "var(--c-pale)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-12 md:mb-16">
          <p className="text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>
            How It Works
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(42px, 8vw, 96px)",
            lineHeight: 0.9,
            color: "var(--c-dark)",
            letterSpacing: "0.01em",
          }}>
            Order Your Website<br />
            <span style={{ color: "var(--c-accent)" }}>in 4 Simple Steps</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--c-dark-60)", fontFamily: "'Inter', sans-serif" }}>
            Getting online shouldn't be complicated. Here's exactly how we go from "I need a website" to "I'm live on the internet."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="relative flex flex-col p-6 md:p-7"
                style={{
                  background: "var(--c-bg)",
                  borderRadius: "20px",
                  border: "1px solid var(--c-dark-08)",
                }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--c-accent-12)" }}>
                    <Icon size={20} style={{ color: "var(--c-accent)" }} />
                  </div>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "52px",
                    lineHeight: 1,
                    color: "var(--c-accent-10)",
                    letterSpacing: "0.02em",
                  }}>
                    {step.number}
                  </span>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-[52px] right-0 translate-x-1/2 z-10"
                    style={{ color: "var(--c-accent-30)", fontSize: "20px" }}>
                    →
                  </div>
                )}

                <h3 className="mb-2 font-semibold"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "17px",
                    color: "var(--c-dark)",
                    letterSpacing: "-0.01em",
                  }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1"
                  style={{ color: "var(--c-dark-60)", fontFamily: "'Inter', sans-serif" }}>
                  {step.desc}
                </p>
                <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "var(--c-accent-10)",
                    color: "var(--c-accent)",
                    fontFamily: "'Inter', sans-serif",
                    alignSelf: "flex-start",
                  }}>
                  {step.highlight}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <button
            onClick={onStartProject}
            className="px-8 py-4 font-semibold text-sm transition-all"
            style={{
              background: "var(--c-accent)",
              color: "var(--c-on-dark)",
              borderRadius: "12px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Start a Project — It's Free
          </button>
          <p className="text-xs" style={{ color: "var(--c-dark-45)", fontFamily: "'Inter', sans-serif" }}>
            No upfront payment · Reply within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
