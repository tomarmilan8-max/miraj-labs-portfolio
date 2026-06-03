import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useProjects, Project } from "@/contexts/ProjectContext";

interface EditWebsiteModalProps {
  open: boolean;
  index: number | null;
  onClose: () => void;
}

export default function EditWebsiteModal({ open, index, onClose }: EditWebsiteModalProps) {
  const { projects, updateProject } = useProjects();
  const project = index !== null ? projects[index] : null;
  const [form, setForm] = useState<Project>({ title: "", category: "", description: "", url: "" });

  useEffect(() => { if (project) setForm({ ...project }); }, [project]);

  if (!open || !project || index === null) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url.trim()) return;
    updateProject(index, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "var(--c-dark-40)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <div className="w-full max-w-md" onClick={e => e.stopPropagation()}
        style={{ background: "var(--c-bg)", borderRadius: "20px", padding: "28px 32px" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "32px", lineHeight: 0.95, color: "var(--c-dark)" }}>
            Edit Website
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "var(--c-dark-08)", color: "var(--c-dark)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--c-pale)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--c-dark-08)")}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {(["title", "category", "description", "url"] as const).map(field => (
            <div key={field} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest"
                style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>
                {field === "url" ? "Website URL" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "description" ? (
                <textarea value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} rows={2}
                  className="text-sm resize-none outline-none transition-all"
                  style={{ background: "var(--c-dark-05)", border: "1px solid var(--c-dark-15)", borderRadius: "10px", padding: "10px 12px", color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--c-accent)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--c-dark-15)")} />
              ) : (
                <input type={field === "url" ? "url" : "text"} value={form[field]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  required={field === "url"}
                  className="text-sm outline-none transition-all"
                  style={{ background: "var(--c-dark-05)", border: "1px solid var(--c-dark-15)", borderRadius: "10px", padding: "10px 12px", color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--c-accent)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--c-dark-15)")} />
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 text-sm font-medium transition-all"
              style={{ background: "var(--c-dark-08)", color: "var(--c-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--c-dark-15)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--c-dark-08)")}>
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-3 text-sm font-medium transition-all"
              style={{ background: "var(--c-accent)", color: "var(--c-on-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
