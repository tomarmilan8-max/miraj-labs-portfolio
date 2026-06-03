import { motion } from "framer-motion";

const founders = [
  {
    name: "Milan Tomar", role: "Lead Developer & Brand Strategist", initials: "MT",
    quote: "A business without a website is a business that doesn't exist for most people. We change that.",
    story: [
      "Commerce student with a passion for digital entrepreneurship",
      "Recognised for an innovative mind — received ₹1,00,000 in government funding from Gujarat",
      "Shipped professional websites for clients across food, wellness, and industrial sectors",
      "Believes that great design is the strongest business argument",
    ],
  },
  {
    name: "Raj Kapasi", role: "Growth Strategist & Developer", initials: "KR",
    quote: "Our commerce background gives us something most developers don't have — we think like your customer.",
    story: [
      "Commerce student who sees every website as a business growth tool",
      "Recognised for an innovative mind — received ₹1,40,000 in government funding from Gujarat",
      "Driven by results — tracking how each website directly impacts client revenue",
      "Bridges the gap between business goals and digital execution",
    ],
  },
];

export default function Founders() {
  return (
    <section id="founders" className="py-20 md:py-32" style={{ background: "var(--c-pale)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4">
          <p className="text-xs font-medium uppercase tracking-widest mb-4"
            style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>The team</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 0.9, color: "var(--c-dark)", marginBottom: "12px" }}>
            The Builders
          </h2>
          <p className="text-sm sm:text-base max-w-md"
            style={{ color: "var(--c-dark-60)", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
            With a commerce background, they understand business — not just code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-12 md:mt-14">
          {founders.map((founder, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-7 sm:p-8 md:p-10 transition-all duration-300"
              style={{ background: "var(--c-dark)", borderRadius: "20px" }}>
              <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--c-accent)" }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "var(--c-on-dark)", letterSpacing: "0.05em" }}>
                    {founder.initials}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 0.95, color: "var(--c-on-dark)" }}>
                    {founder.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest mt-1"
                    style={{ color: "var(--c-soft)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    {founder.role}
                  </p>
                  <p className="text-xs mt-0.5"
                    style={{ color: "var(--c-on-dark-30)", fontFamily: "'Inter', sans-serif" }}>
                    CO-FOUNDER · AGE 19 · COMMERCE · GUJARAT
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 sm:mb-7">
                {founder.story.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: "var(--c-on-dark-65)", fontFamily: "'Inter', sans-serif" }}>
                    <span className="shrink-0 mt-1" style={{ color: "var(--c-accent)" }}>→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="p-5 sm:p-6 relative"
                style={{ background: "var(--c-on-dark-07)", borderRadius: "12px", borderLeft: "3px solid var(--c-accent)" }}>
                <p className="text-sm italic leading-relaxed"
                  style={{ color: "var(--c-on-dark-85)", fontFamily: "'Inter', sans-serif" }}>
                  "{founder.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
