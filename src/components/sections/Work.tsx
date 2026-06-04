import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, ExternalLink, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects, Project } from "@/contexts/ProjectContext";
import { useLocation } from "wouter";
import EditWebsiteModal from "@/components/EditWebsiteModal";

function KebabMenu({ onEdit, onRemove }: { onEdit: () => void; onRemove: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative" style={{ zIndex: 20 }}>
      <button onClick={e => { e.preventDefault(); e.stopPropagation(); setOpen(o => !o); }}
        className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
        style={{ background: "var(--c-on-dark-10)", color: "var(--c-on-dark)" }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--c-on-dark-20)")}
        onMouseLeave={e => (e.currentTarget.style.background = "var(--c-on-dark-10)")}>
        <MoreVertical size={15} />
      </button>
      {open && (
        <div className="absolute right-0 top-10 w-40 overflow-hidden"
          style={{ background: "var(--c-bg)", borderRadius: "12px", boxShadow: "0 8px 32px var(--c-dark-20)", border: "1px solid var(--c-dark-10)" }}>
          <button onClick={e => { e.stopPropagation(); setOpen(false); onEdit(); }}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-left transition-colors"
            style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--c-pale)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <Pencil size={14} style={{ color: "var(--c-dark)" }} /> Edit
          </button>
          <div style={{ height: "1px", background: "var(--c-dark-08)" }} />
          <button onClick={e => { e.stopPropagation(); setOpen(false); onRemove(); }}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-left transition-colors"
            style={{ color: "#c0392b", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#fff0ee")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <Trash2 size={14} style={{ color: "#c0392b" }} /> Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default function Work() {
  const { isAdmin } = useAuth();
  const { projects, loading, removeProject } = useProjects();
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [, navigate] = useLocation();

  return (
    <section id="work" className="py-20 md:py-32" style={{ background: "var(--c-bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>Portfolio</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 0.9, color: "var(--c-dark)" }}>
              Our Work
            </h2>
          </div>
          {isAdmin && (
            <button onClick={() => navigate("/admin")}
              className="self-start md:self-end flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all"
              style={{ background: "var(--c-soft)", color: "var(--c-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--c-on-dark)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-soft)"; (e.currentTarget as HTMLElement).style.color = "var(--c-dark)"; }}>
              <Plus size={16} /> Manage in Admin
            </button>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="overflow-hidden" style={{ background: "var(--c-dark)", borderRadius: "20px", aspectRatio: "4/3" }}>
                <div className="w-full h-full animate-pulse" style={{ background: "var(--c-dark-20)" }} />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: "var(--c-dark-40)", fontFamily: "'Inter', sans-serif" }}>No projects yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
            {projects.map((project, i) => (
              <motion.div key={project.id || i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: Math.min(i * 0.08, 0.32) }}
                className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--c-dark)", borderRadius: "20px" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 20px 48px var(--c-dark-25)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>

                <div className="relative w-full overflow-hidden" style={{ background: "var(--c-dark-08)", aspectRatio: "16/9" }}>
                  <div className="absolute inset-0 w-[285%] h-[285%] origin-top-left scale-[0.35]">
                    <iframe src={project.url} className="w-full h-full border-0 pointer-events-none" loading="lazy" title={project.title} />
                  </div>
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="absolute inset-0 z-10" aria-label={`Visit ${project.title}`} />
                </div>

                <div className="p-5 sm:p-7 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="inline-block text-xs font-medium px-3 py-1 mb-2 sm:mb-3"
                        style={{ background: "var(--c-accent-20)", color: "var(--c-soft)", borderRadius: "10px", fontFamily: "'Inter', sans-serif" }}>
                        {project.category}
                      </span>
                      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 0.95, color: "var(--c-on-dark)" }}>
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1 shrink-0">
                      {isAdmin && (
                        <KebabMenu
                          onEdit={() => setEditProject(project)}
                          onRemove={() => project.id && removeProject(project.id)}
                        />
                      )}
                      <a href={project.url} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                        style={{ background: "var(--c-on-dark-10)", color: "var(--c-on-dark)" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "var(--c-accent)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "var(--c-on-dark-10)")}>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed"
                    style={{ color: "var(--c-on-dark-60)", fontFamily: "'Inter', sans-serif" }}>
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <EditWebsiteModal
        open={editProject !== null}
        project={editProject}
        onClose={() => setEditProject(null)}
      />
    </section>
  );
}
