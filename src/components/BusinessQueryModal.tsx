import { useState } from "react";
import { X, Building2, Globe, DollarSign, Clock, Phone, FileText, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BusinessQueryModalProps {
  open: boolean;
  onClose: () => void;
}

const WEBSITE_TYPES = ["Restaurant / Food", "Portfolio / Freelancer", "E-commerce / Shop", "Corporate / Company", "Landing Page", "Blog / Content", "Other"];
const BUDGETS       = ["Under ₹5,000", "₹5,000 – ₹15,000", "₹15,000 – ₹30,000", "₹30,000+", "Not sure yet"];
const TIMELINES     = ["ASAP (within a week)", "1–2 weeks", "Within a month", "Flexible"];

export default function BusinessQueryModal({ open, onClose }: BusinessQueryModalProps) {
  const [step, setStep]               = useState<"form" | "sent">("form");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry]        = useState("");
  const [websiteType, setWebsiteType]  = useState("");
  const [budget, setBudget]            = useState("");
  const [timeline, setTimeline]        = useState("");
  const [phone, setPhone]              = useState("");
  const [notes, setNotes]              = useState("");

  const reset = () => {
    setStep("form"); setBusinessName(""); setIndustry(""); setWebsiteType("");
    setBudget(""); setTimeline(""); setPhone(""); setNotes("");
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Project Inquiry — ${businessName || "Unknown Business"}`);
    const body = encodeURIComponent(
      `Hello Milan & Raj,\n\nI'm interested in getting a website built. Here are my details:\n\n` +
      `Business Name: ${businessName}\nIndustry: ${industry}\nWebsite Type: ${websiteType}\n` +
      `Budget: ${budget}\nTimeline: ${timeline}\nPhone/WhatsApp: ${phone}\n\nAdditional Notes:\n${notes}\n\n` +
      `Looking forward to hearing from you!\n\n— ${businessName}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=tomarmilan8@gmail.com,kapasiraj84@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
    setStep("sent");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0"
            style={{ background: "var(--c-dark-40)", backdropFilter: "blur(8px)" }}
            onClick={handleClose} />

          <motion.div className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto z-10"
            style={{ background: "var(--c-bg)", borderRadius: "20px" }}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}>

            {step === "sent" ? (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "var(--c-pale)" }}>
                  <CheckCircle size={28} style={{ color: "var(--c-accent)" }} />
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px", lineHeight: 0.95, color: "var(--c-dark)", marginBottom: "12px" }}>
                  Message Sent!
                </h2>
                <p className="text-sm mb-8 leading-relaxed max-w-xs"
                  style={{ color: "var(--c-dark-60)", fontFamily: "'Inter', sans-serif" }}>
                  Your email client opened with the details. If it didn't open, please email us directly at{" "}
                  <a href="mailto:tomarmilan8@gmail.com" style={{ color: "var(--c-accent)" }}>tomarmilan8@gmail.com</a>.
                </p>
                <button onClick={handleClose}
                  className="px-7 py-3 text-sm font-medium"
                  style={{ background: "var(--c-accent)", color: "var(--c-on-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif" }}>
                  Close
                </button>
              </div>
            ) : (
              <div className="p-8">
                <button onClick={handleClose} className="absolute top-5 right-5"
                  style={{ color: "var(--c-dark-40)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--c-accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--c-dark-40)")}>
                  <X size={20} />
                </button>

                <p className="text-xs font-medium uppercase tracking-widest mb-1"
                  style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>Start a Project</p>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px", lineHeight: 0.95, color: "var(--c-dark)", marginBottom: "6px" }}>
                  Tell Us About Your Business
                </h2>
                <p className="text-sm mb-7 leading-relaxed"
                  style={{ color: "var(--c-dark-55)", fontFamily: "'Inter', sans-serif" }}>
                  Fill in the details below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { icon: Building2, label: "Business Name *", value: businessName, setter: setBusinessName, placeholder: "e.g. Sunrise Bakery" },
                    { icon: Globe,     label: "Industry",         value: industry,     setter: setIndustry,     placeholder: "e.g. Food & Hospitality" },
                    { icon: Phone,     label: "Phone / WhatsApp", value: phone,        setter: setPhone,        placeholder: "+91 98765 43210" },
                  ].map(({ icon: Icon, label, value, setter, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
                        style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>{label}</label>
                      <div className="flex items-center gap-3 px-4 py-3"
                        style={{ background: "var(--c-pale)", borderRadius: "10px", border: "1px solid var(--c-accent-12)" }}>
                        <Icon size={15} style={{ color: "var(--c-accent)", flexShrink: 0 }} />
                        <input type="text" value={value} onChange={e => setter(e.target.value)}
                          placeholder={placeholder}
                          className="flex-1 bg-transparent text-sm outline-none"
                          style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }} />
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>Type of Website</label>
                    <div className="flex flex-wrap gap-2">
                      {WEBSITE_TYPES.map(t => (
                        <button key={t} type="button" onClick={() => setWebsiteType(t)}
                          className="px-3 py-1.5 text-xs font-medium transition-all"
                          style={{
                            borderRadius: "8px",
                            border: "1px solid",
                            borderColor: websiteType === t ? "var(--c-accent)" : "var(--c-dark-15)",
                            background: websiteType === t ? "var(--c-accent)" : "transparent",
                            color: websiteType === t ? "var(--c-on-dark)" : "var(--c-dark-60)",
                            fontFamily: "'Inter', sans-serif",
                          }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>
                      <DollarSign size={12} style={{ display: "inline", marginBottom: "2px" }} /> Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map(b => (
                        <button key={b} type="button" onClick={() => setBudget(b)}
                          className="px-3 py-1.5 text-xs font-medium transition-all"
                          style={{
                            borderRadius: "8px", border: "1px solid",
                            borderColor: budget === b ? "var(--c-accent)" : "var(--c-dark-15)",
                            background: budget === b ? "var(--c-accent)" : "transparent",
                            color: budget === b ? "var(--c-on-dark)" : "var(--c-dark-60)",
                            fontFamily: "'Inter', sans-serif",
                          }}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>
                      <Clock size={12} style={{ display: "inline", marginBottom: "2px" }} /> Timeline
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINES.map(t => (
                        <button key={t} type="button" onClick={() => setTimeline(t)}
                          className="px-3 py-1.5 text-xs font-medium transition-all"
                          style={{
                            borderRadius: "8px", border: "1px solid",
                            borderColor: timeline === t ? "var(--c-accent)" : "var(--c-dark-15)",
                            background: timeline === t ? "var(--c-accent)" : "transparent",
                            color: timeline === t ? "var(--c-on-dark)" : "var(--c-dark-60)",
                            fontFamily: "'Inter', sans-serif",
                          }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>
                      <FileText size={12} style={{ display: "inline", marginBottom: "2px" }} /> Additional Notes
                    </label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                      placeholder="Tell us more about what you're looking for..."
                      className="w-full text-sm outline-none resize-none"
                      style={{
                        background: "var(--c-pale)", borderRadius: "10px",
                        border: "1px solid var(--c-accent-12)", padding: "12px",
                        color: "var(--c-dark)", fontFamily: "'Inter', sans-serif",
                      }} />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={handleClose}
                      className="flex-1 py-3 text-sm font-medium border transition-all"
                      style={{ borderColor: "var(--c-dark-20)", color: "var(--c-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", background: "transparent" }}>
                      Cancel
                    </button>
                    <button type="submit" disabled={!businessName.trim()}
                      className="flex-1 py-3 text-sm font-medium transition-all"
                      style={{ background: businessName.trim() ? "var(--c-accent)" : "var(--c-dark-20)", color: "var(--c-on-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      Send Inquiry
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
