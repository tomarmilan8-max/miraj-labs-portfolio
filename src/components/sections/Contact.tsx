import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

interface ContactProps {
  onStartProject: () => void;
}

export default function Contact({ onStartProject }: ContactProps) {
  return (
    <section id="contact" className="py-24 sm:py-32 overflow-hidden relative" style={{ background: "var(--c-accent)" }}>
      <div className="absolute inset-x-0 bottom-[-4%] text-center pointer-events-none select-none"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(80px, 18vw, 220px)", lineHeight: 0.8, color: "var(--c-dark-12)", letterSpacing: "0.01em" }}
        aria-hidden="true">
        BUILD
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest mb-6"
            style={{ color: "var(--c-on-dark-65)", fontFamily: "'Inter', sans-serif" }}>Start the conversation</p>

          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 12vw, 140px)", lineHeight: 0.88, color: "var(--c-on-dark)", marginBottom: "24px" }}>
            Ready<br />to Build?
          </h2>

          <p className="text-sm sm:text-base mb-8 sm:mb-12 max-w-md leading-relaxed"
            style={{ color: "var(--c-on-dark-75)", fontFamily: "'Inter', sans-serif" }}>
            Tell us about your project and we will bring it to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
            <a href="mailto:tomarmilan8@gmail.com"
              className="flex items-center gap-4 px-5 sm:px-6 py-4 transition-all"
              style={{ background: "var(--c-on-dark-15)", borderRadius: "14px", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--c-on-dark-25)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--c-on-dark-15)")}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--c-on-dark-20)" }}>
                <Mail size={16} style={{ color: "var(--c-on-dark)" }} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest mb-0.5"
                  style={{ color: "var(--c-on-dark-55)", fontFamily: "'Inter', sans-serif" }}>Milan</div>
                <div className="text-xs sm:text-sm font-medium"
                  style={{ color: "var(--c-on-dark)", fontFamily: "'Inter', sans-serif" }}>tomarmilan8@gmail.com</div>
              </div>
            </a>

            <a href="mailto:kapasiraj84@gmail.com"
              className="flex items-center gap-4 px-5 sm:px-6 py-4 transition-all"
              style={{ background: "var(--c-on-dark-15)", borderRadius: "14px", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--c-on-dark-25)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--c-on-dark-15)")}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--c-on-dark-20)" }}>
                <Mail size={16} style={{ color: "var(--c-on-dark)" }} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest mb-0.5"
                  style={{ color: "var(--c-on-dark-55)", fontFamily: "'Inter', sans-serif" }}>Raj</div>
                <div className="text-xs sm:text-sm font-medium"
                  style={{ color: "var(--c-on-dark)", fontFamily: "'Inter', sans-serif" }}>kapasiraj84@gmail.com</div>
              </div>
            </a>

            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 sm:px-6 py-4 transition-all"
              style={{ background: "var(--c-on-dark-15)", borderRadius: "14px", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--c-on-dark-25)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--c-on-dark-15)")}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--c-on-dark-20)" }}>
                <FaWhatsapp size={16} style={{ color: "var(--c-on-dark)" }} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest mb-0.5"
                  style={{ color: "var(--c-on-dark-55)", fontFamily: "'Inter', sans-serif" }}>WhatsApp</div>
                <div className="text-xs sm:text-sm font-medium"
                  style={{ color: "var(--c-on-dark)", fontFamily: "'Inter', sans-serif" }}>Connect on WhatsApp</div>
              </div>
            </a>
          </div>

          <button onClick={onStartProject}
            className="px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium transition-all"
            style={{ background: "var(--c-on-dark)", color: "var(--c-accent)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-dark)"; (e.currentTarget as HTMLElement).style.color = "var(--c-on-dark)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-on-dark)"; (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; }}>
            Start a Project
          </button>

          <p className="mt-6 text-xs uppercase tracking-widest"
            style={{ color: "var(--c-on-dark-45)", fontFamily: "'Inter', sans-serif" }}>
            Usually respond within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
