import { motion } from "framer-motion";
import { Clock, Users, TrendingUp, ShieldCheck, Globe } from "lucide-react";

const reasons = [
  { icon: Clock,       title: "Open 24 Hours a Day",             description: "Your website never sleeps. While you rest, it answers questions, shows your work, and converts visitors into customers — every single hour." },
  { icon: Users,       title: "Your Customers Are Already Online", description: "Over 80% of consumers research a business online before making a decision. If you are not there, your competitor is — and they are getting your sale." },
  { icon: TrendingUp,  title: "More Reach. More Revenue.",        description: "A well-built website expands your reach beyond your city, your circle, your comfort zone. It turns local businesses into regional ones." },
  { icon: ShieldCheck, title: "Trust Starts With a Website",      description: "75% of people judge a business credibility by its website. A polished, professional site tells customers: we are serious, and we will take your work seriously too." },
  { icon: Globe,       title: "Your Permanent Digital Address",   description: "Social media gets restricted. WhatsApp has limits. But your website is yours — forever. A digital home that no algorithm can take away from you." },
];

export default function WhyWebsite() {
  const scrollToContact = () => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); };

  return (
    <section id="why" className="py-20 md:py-32" style={{ background: "var(--c-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4">
          <p className="text-xs font-medium uppercase tracking-widest mb-4"
            style={{ color: "var(--c-soft)", fontFamily: "'Inter', sans-serif" }}>Why it matters</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 8vw, 100px)", lineHeight: 0.9, color: "var(--c-on-dark)", marginBottom: "16px" }}>
            Why Your Business<br />
            <span style={{ color: "var(--c-soft)" }}>Needs a Website</span>
          </h2>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }} className="text-sm sm:text-base max-w-xl mb-12 md:mb-16 leading-relaxed"
          style={{ color: "var(--c-on-dark-60)", fontFamily: "'Inter', sans-serif" }}>
          Not having a website in 2026 is like having a shop with no signboard. Here is what you are missing — and what we can fix.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="p-6 sm:p-7 transition-all duration-300"
                style={{ background: "var(--c-on-dark-07)", borderRadius: "20px", border: "1px solid var(--c-on-dark-10)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-accent-15)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent-30)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-on-dark-07)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-on-dark-10)"; }}>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center mb-4 sm:mb-5"
                  style={{ background: "var(--c-accent-20)" }}>
                  <Icon size={18} style={{ color: "var(--c-soft)" }} />
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px, 2.5vw, 26px)", lineHeight: 1, color: "var(--c-on-dark)", marginBottom: "10px" }}>
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: "var(--c-on-dark-55)", fontFamily: "'Inter', sans-serif" }}>
                  {reason.description}
                </p>
              </motion.div>
            );
          })}

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: reasons.length * 0.07 }}
            className="p-6 sm:p-7 flex flex-col justify-between"
            style={{ background: "var(--c-accent)", borderRadius: "20px" }}>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-4"
                style={{ color: "var(--c-on-dark-65)", fontFamily: "'Inter', sans-serif" }}>Ready to start?</p>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 0.95, color: "var(--c-on-dark)", marginBottom: "12px" }}>
                Let us build your digital presence today.
              </h3>
              <p className="text-sm leading-relaxed mb-6 sm:mb-8"
                style={{ color: "var(--c-on-dark-75)", fontFamily: "'Inter', sans-serif" }}>
                Every day without a website, your competitor grows stronger.
              </p>
            </div>
            <button onClick={scrollToContact}
              className="self-start px-6 py-3 text-sm font-medium transition-all"
              style={{ background: "var(--c-on-dark)", color: "var(--c-accent)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-dark)"; (e.currentTarget as HTMLElement).style.color = "var(--c-on-dark)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-on-dark)"; (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; }}>
              Get Your Website
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
