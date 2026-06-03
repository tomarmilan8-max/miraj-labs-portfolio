import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Pencil, ExternalLink, Globe, Tag, FileText, Layers, LogOut, Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects, Project } from "@/contexts/ProjectContext";

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="p-6" style={{ background: "var(--c-pale)", borderRadius: "14px" }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", lineHeight: 0.9, color: "var(--c-accent)", marginBottom: "6px" }}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--c-dark-55)", fontFamily: "'Inter', sans-serif" }}>
        {label}
      </div>
    </div>
  );
}

function AddForm({ onAdd }: { onAdd: (p: Project) => void }) {
  const [url, setUrl]             = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [title, setTitle]         = useState("");
  const [category, setCategory]   = useState("");
  const [description, setDescription] = useState("");
  const [error, setError]         = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const handleUrlChange = (v: string) => {
    setUrl(v);
    setError("");
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try { new URL(v.trim()); setPreviewUrl(v.trim()); }
      catch { setPreviewUrl(""); }
    }, 700);
  };

  const handleAdd = () => {
    if (!url.trim()) { setError("URL is required"); return; }
    try { new URL(url.trim()); } catch { setError("Enter a valid URL"); return; }
    if (!title.trim()) { setError("Project name is required"); return; }
    onAdd({ url: url.trim(), title: title.trim(), category: category.trim() || "Web Project", description: description.trim() || "A website built by MIRAJ LABS." });
    setUrl(""); setPreviewUrl(""); setTitle(""); setCategory(""); setDescription(""); setError("");
  };

  const fields = [
    { icon: Globe, label: "Website URL *", value: url, setter: (v: string) => handleUrlChange(v), placeholder: "https://yourwebsite.com" },
    { icon: Tag, label: "Project Name *", value: title, setter: (v: string) => setTitle(v), placeholder: "e.g. Sunrise Bakery" },
    { icon: Layers, label: "Industry / Category", value: category, setter: (v: string) => setCategory(v), placeholder: "e.g. Food & Hospitality" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        {fields.map(({ icon: Icon, label, value, setter, placeholder }) => (
          <div key={label}>
            <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
              style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>{label}</label>
            <div className="flex items-center gap-3 px-4 py-3"
              style={{ background: "var(--c-pale)", borderRadius: "10px", border: "1px solid var(--c-accent-12)" }}>
              <Icon size={14} style={{ color: "var(--c-accent)", flexShrink: 0 }} />
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
            style={{ background: "var(--c-pale)", borderRadius: "10px", border: "1px solid var(--c-accent-12)" }}>
            <FileText size={14} style={{ color: "var(--c-accent)", flexShrink: 0, marginTop: "2px" }} />
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="One sentence about this website" rows={2}
              className="flex-1 bg-transparent text-sm outline-none resize-none"
              style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }} />
          </div>
        </div>
        {error && <p className="text-sm" style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>{error}</p>}
        <button onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all"
          style={{ background: "var(--c-accent)", color: "var(--c-on-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
          <Plus size={16} /> Add to Portfolio
        </button>
      </div>

      <div>
        <div className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>
          Live Preview
        </div>
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", borderRadius: "12px", background: "var(--c-dark-08)" }}>
          {previewUrl ? (
            <div className="absolute inset-0">
              <div className="absolute inset-0 w-[285%] h-[285%] origin-top-left scale-[0.35]">
                <iframe src={previewUrl} className="w-full h-full border-0 pointer-events-none" title="Preview" />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Globe size={28} style={{ color: "var(--c-dark-20)" }} />
              <p className="text-xs" style={{ color: "var(--c-dark-30)", fontFamily: "'Inter', sans-serif" }}>
                Enter a URL to see preview
              </p>
            </div>
          )}
        </div>
        {previewUrl && (
          <a href={previewUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs mt-2 transition-colors"
            style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>
            <ExternalLink size={12} /> Open in new tab
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectRow({ project, onEdit, onRemove }: { project: Project; index: number; onEdit: (updated: Project) => void; onRemove: () => void }) {
  const [editing, setEditing]   = useState(false);
  const [form, setForm]         = useState<Project>(project);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => { setForm(project); }, [project]);

  if (editing) return (
    <div className="p-5 space-y-3" style={{ background: "var(--c-pale)", borderRadius: "14px" }}>
      {(["url", "title", "category", "description"] as const).map(f => (
        <div key={f} className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-widest" style={{ color: "var(--c-dark-40)", fontFamily: "'Inter', sans-serif" }}>
            {f === "url" ? "Website URL" : f.charAt(0).toUpperCase() + f.slice(1)}
          </label>
          {f === "description" ? (
            <textarea value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} rows={2}
              className="text-sm outline-none resize-none px-3 py-2"
              style={{ background: "var(--c-bg)", borderRadius: "8px", border: "1px solid var(--c-dark-12)", color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }} />
          ) : (
            <input type="text" value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
              className="text-sm outline-none px-3 py-2"
              style={{ background: "var(--c-bg)", borderRadius: "8px", border: "1px solid var(--c-dark-12)", color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }} />
          )}
        </div>
      ))}
      <div className="flex gap-2 pt-1">
        <button onClick={() => { onEdit(form); setEditing(false); }}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium"
          style={{ background: "var(--c-accent)", color: "var(--c-on-dark)", borderRadius: "8px", fontFamily: "'Inter', sans-serif" }}>
          <Check size={14} /> Save
        </button>
        <button onClick={() => setEditing(false)}
          className="flex items-center gap-1.5 px-4 py-2 text-sm"
          style={{ background: "var(--c-dark-10)", color: "var(--c-dark)", borderRadius: "8px", fontFamily: "'Inter', sans-serif" }}>
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-4 p-4" style={{ border: "1px solid var(--c-dark-10)", borderRadius: "14px" }}>
      <div className="shrink-0 overflow-hidden" style={{ width: "80px", height: "52px", borderRadius: "8px", background: "var(--c-dark-08)", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, width: "285%", height: "285%", transformOrigin: "top left", transform: "scale(0.35)" }}>
          <iframe src={project.url} className="w-full h-full border-0 pointer-events-none" title={project.title} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate" style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }}>{project.title}</div>
        <div className="text-xs" style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>{project.category}</div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a href={project.url} target="_blank" rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
          style={{ background: "var(--c-dark-08)", color: "var(--c-dark-60)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--c-pale)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--c-dark-08)")}>
          <ExternalLink size={14} />
        </a>
        <button onClick={() => setEditing(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
          style={{ background: "var(--c-dark-08)", color: "var(--c-dark-60)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--c-pale)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--c-dark-08)")}>
          <Pencil size={14} />
        </button>
        {confirmDelete ? (
          <div className="flex items-center gap-1">
            <button onClick={onRemove}
              className="px-2 py-1 text-xs font-medium"
              style={{ background: "#dc2626", color: "#fff", borderRadius: "6px", fontFamily: "'Inter', sans-serif" }}>
              Delete
            </button>
            <button onClick={() => setConfirmDelete(false)}
              className="px-2 py-1 text-xs"
              style={{ background: "var(--c-dark-10)", color: "var(--c-dark)", borderRadius: "6px", fontFamily: "'Inter', sans-serif" }}>
              No
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
            style={{ background: "var(--c-dark-08)", color: "#dc2626" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#fee2e2")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--c-dark-08)")}>
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const { isAdmin, logout } = useAuth();
  const [, navigate] = useLocation();
  const { projects, addProject, removeProject, updateProject, stats } = useProjects();

  const [editForm, setEditForm] = useState<{ index: number; data: Project } | null>(null);

  useEffect(() => { if (!isAdmin) navigate("/"); }, [isAdmin, navigate]);
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen" style={{ background: "var(--c-bg)", fontFamily: "'Inter', sans-serif" }}>
      <header className="sticky top-0 z-50 border-b"
        style={{ background: "var(--c-bg)", borderColor: "var(--c-dark-10)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-sm transition-colors shrink-0"
              style={{ color: "var(--c-dark-60)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--c-accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--c-dark-60)")}>
              <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to site</span>
            </button>
            <div className="w-px h-5 shrink-0" style={{ background: "var(--c-dark-15)" }} />
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "0.1em", color: "var(--c-dark)" }}>
              MIRAJ LABS
            </div>
            <span className="hidden sm:inline text-xs px-2 py-0.5 font-medium uppercase tracking-widest"
              style={{ background: "var(--c-pale)", color: "var(--c-accent)", borderRadius: "6px" }}>
              Admin
            </span>
          </div>
          <button onClick={() => { logout(); navigate("/"); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all shrink-0"
            style={{ background: "var(--c-pale)", color: "var(--c-dark)", borderRadius: "10px" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--c-on-dark)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-pale)"; (e.currentTarget as HTMLElement).style.color = "var(--c-dark)"; }}>
            <LogOut size={14} /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 space-y-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--c-accent)" }}>Overview</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 8vw, 80px)", lineHeight: 0.9, color: "var(--c-dark)", marginBottom: "20px" }}>
            Admin Panel
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard value={stats.websites} label="Total Websites" />
            <StatCard value={stats.industries} label="Industries" />
            <StatCard value={`${stats.satisfaction}%`} label="Satisfaction" />
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", lineHeight: 0.95, color: "var(--c-dark)", marginBottom: "20px" }}>
            Add New Website
          </h2>
          <div className="p-6 md:p-8" style={{ background: "var(--c-bg)", border: "1px solid var(--c-dark-10)", borderRadius: "20px" }}>
            <AddForm onAdd={addProject} />
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", lineHeight: 0.95, color: "var(--c-dark)", marginBottom: "20px" }}>
            Manage Websites ({projects.length})
          </h2>
          <div className="space-y-3">
            {projects.length === 0 ? (
              <p className="text-sm py-8 text-center" style={{ color: "var(--c-dark-40)", fontFamily: "'Inter', sans-serif" }}>
                No websites yet. Add one above.
              </p>
            ) : (
              projects.map((p, i) => (
                <motion.div key={`${p.url}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <ProjectRow
                    project={p}
                    index={i}
                    onEdit={(updated) => updateProject(i, updated)}
                    onRemove={() => removeProject(i)}
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
