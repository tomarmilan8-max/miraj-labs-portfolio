import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export interface Project {
  id?: string;
  title: string;
  category: string;
  description: string;
  url: string;
}

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  addProject: (p: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  updateProject: (id: string, p: Project) => Promise<void>;
  stats: { websites: number; industries: number; satisfaction: number };
}

const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  loading: true,
  addProject: async () => {},
  removeProject: async () => {},
  updateProject: async () => {},
  stats: { websites: 0, industries: 0, satisfaction: 100 },
});

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all projects from Supabase on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error && data) setProjects(data);
    setLoading(false);
  };

  const addProject = async (p: Project) => {
    const { data, error } = await supabase
      .from("projects")
      .insert([{ title: p.title, category: p.category, description: p.description, url: p.url }])
      .select()
      .single();
    if (!error && data) setProjects(prev => [...prev, data]);
  };

  const removeProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateProject = async (id: string, p: Project) => {
    const { error } = await supabase
      .from("projects")
      .update({ title: p.title, category: p.category, description: p.description, url: p.url })
      .eq("id", id);
    if (!error) setProjects(prev => prev.map(x => x.id === id ? { ...x, ...p } : x));
  };

  const stats = useMemo(() => ({
    websites: projects.length,
    industries: new Set(projects.map(p => p.category)).size,
    satisfaction: 100,
  }), [projects]);

  return (
    <ProjectContext.Provider value={{ projects, loading, addProject, removeProject, updateProject, stats }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);
