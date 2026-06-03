import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export interface Project {
  title: string;
  category: string;
  description: string;
  url: string;
}

const initialProjects: Project[] = [
  { title: "Pizza Land Brand",      category: "Food & Hospitality", description: "A vibrant food brand website for a pizzeria", url: "https://pizza-land-brand--miluuu2912.replit.app/" },
  { title: "Shardha Packaging",     category: "Industrial B2B",     description: "Professional packaging company site with product catalogue", url: "https://shardhapackaging.netlify.app/" },
  { title: "Bhavya Steel Industries", category: "Manufacturing",    description: "Steel industry corporate site with company profile", url: "https://kapasiraj84-beep.github.io/bhavya-steel-industries/index.html" },
  { title: "MindMate Pro",          category: "Health & Wellness",  description: "Mental wellness app landing page with calm modern aesthetic", url: "https://miluuu2912.github.io/mindmate-pro/" },
  { title: "Client Website",        category: "Web Design",         description: "A professionally built website delivered for a client", url: "https://b005ba41-b8aa-4cee-9bd4-5db496897291-00-3e2wbgpas7ims.sisko.replit.dev/" },
];

interface ProjectContextType {
  projects: Project[];
  addProject: (p: Project) => void;
  removeProject: (i: number) => void;
  updateProject: (i: number, p: Project) => void;
  stats: { websites: number; industries: number; satisfaction: number };
}

const ProjectContext = createContext<ProjectContextType>({
  projects: initialProjects,
  addProject: () => {},
  removeProject: () => {},
  updateProject: () => {},
  stats: { websites: 5, industries: 5, satisfaction: 100 },
});

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject    = (p: Project) => setProjects(prev => [...prev, p]);
  const removeProject = (i: number) => setProjects(prev => prev.filter((_, idx) => idx !== i));
  const updateProject = (i: number, p: Project) => setProjects(prev => prev.map((x, idx) => idx === i ? p : x));

  const stats = useMemo(() => ({
    websites:     projects.length,
    industries:   new Set(projects.map(p => p.category)).size,
    satisfaction: 100,
  }), [projects]);

  return (
    <ProjectContext.Provider value={{ projects, addProject, removeProject, updateProject, stats }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);
