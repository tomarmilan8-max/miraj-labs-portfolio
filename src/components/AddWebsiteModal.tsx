import { useState } from "react";
import { X, Link as LinkIcon, Tag, FileText, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/contexts/ProjectContext";

interface AddWebsiteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddWebsiteModal({ open, onClose }: AddWebsiteModalProps) {
  const { addProject } = useProjects();
  const [url, setUrl]               = useState("");
  const [title, setTitle]           = useState("");
  const [category, setCategory]     = useState("");
  const [description, setDescription] = useState("");
  const [error, setError]           = useState("");

  const reset = () => { setUrl(""); setTitle(""); setCategory(""); setDescription(""); setError(""); };
  const handleClose = () => { reset(); onClose(); };

  const isValidUrl = (v: string) => { try { new URL(v); return true; } catch { return false; } };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim())             { setError("Please enter a website URL."); return; }
    if (!isValidUrl(url.trim())) { setError("Please enter a valid URL (e.g. https://example.com)"); return; }
    if (!title.trim())           { setError("Please enter a project name."); return; }
    addProject({ url: url.trim(), title: title.trim(), category: category.trim() || "Web Project", description: description.trim() || "A website built by MIRAJ LABS." });
    reset(); onClose();
  };

  const fields = [
    { icon: LinkIcon, label: "Website URL *",       value: url,         setter: (v: string) => { setUrl(v); setError(""); },      placeholder: "https://yourwebsite.com" },
    { icon: Tag,      label: "Project Name *",       value: title,       setter: (v: string) => { setTitle(v); setError(""); },    placeholder: "e.g. Sunrise Bakery" },
    { icon: Layers,   label: "Industry / Category",  value: category,    setter: setCategory,                                      placeholder: "e.g. Food & Hospitality" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0"
            style={{ background: "var(--c-dark-40)", backdropFilter: "blur(6px)" }}
            onClick={handleClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div className="relative w-full max-w-lg p-7 sm:p-10 z-10"
            style={{ background: "var(--c-bg)", borderRadius: "20px" }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}>
            <button onClick={handleClose} className="absolute top-5 right-5 transition-colors"
              style={{ color: "var(--c-dark-40)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--c-accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--c-dark-40)")}>
              <X size={22} />
            </button>

            <p className="text-xs font-medium uppercase tracking-widest mb-2"
              style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>New Entry</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 42px)", lineHeight: 0.95, color: "var(--c-dark)", marginBottom: "8px" }}>
              Add a Website
            </h2>
            <p className="text-sm mb-7 leading-relaxed"
              style={{ color: "var(--c-dark-55)", fontFamily: "'Inter', sans-serif" }}>
              Paste the link to any website. It will appear in the showcase instantly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(({ icon: Icon, label, value, setter, placeholder }) => (
                <div key={label}>
                  <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
                    style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>{label}</label>
                  <div className="flex items-center gap-3 px-4 py-3 transition-colors"
                    style={{ background: "var(--c-pale)", borderRadius: "10px", border: "1px solid var(--c-accent-15)" }}>
                    <Icon size={15} style={{ color: "var(--c-accent)", flexShrink: 0 }} />
                    <input type="text" value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                      className="flex-1 bg-transparent text-sm outline-none"
                      style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }} />
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
                  style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>Short Description</label>
                <div className="flex items-start gap-3 px-4 py-3"
                  style={{ background: "var(--c-pale)", borderRadius: "10px", border: "1px solid var(--c-accent-15)" }}>
                  <FileText size={15} style={{ color: "var(--c-accent)", flexShrink: 0, marginTop: "2px" }} />
                  <textarea value={description} onChange={e => setDescription(e.target.value)}
                    placeholder="One sentence about this website" rows={2}
                    className="flex-1 bg-transparent text-sm outline-none resize-none"
                    style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }} />
                </div>
              </div>

              {error && <p className="text-sm" style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleClose}
                  className="flex-1 py-3 text-sm font-medium transition-all border"
                  style={{ borderColor: "var(--c-dark-20)", color: "var(--c-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", background: "transparent" }}>
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 py-3 text-sm font-medium transition-all"
                  style={{ background: "var(--c-accent)", color: "var(--c-on-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  Add to Showcase
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
