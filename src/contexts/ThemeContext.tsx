import { createContext, useContext, useState, ReactNode } from "react";

function wo(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

export interface ThemeColors {
  bg: string;
  dark: string;
  accent: string;
  soft: string;
  pale: string;
  onDark: string;
  name: string;
}

const THEMES: ThemeColors[] = [
  { name: "Classic",  bg: "#fff8f6", dark: "#00522d", accent: "#db3c8a", soft: "#f29ebd", pale: "#fce5df", onDark: "#fff8f6" },
  { name: "Midnight", bg: "#0d1117", dark: "#238636", accent: "#58a6ff", soft: "#79c0ff", pale: "#1c2128", onDark: "#e6edf3" },
  { name: "Coral",    bg: "#fff5f0", dark: "#9b2335", accent: "#e85d04", soft: "#f4a261", pale: "#fde8df", onDark: "#fff5f0" },
  { name: "Violet",   bg: "#f5f0ff", dark: "#4a0e8f", accent: "#7c3aed", soft: "#a78bfa", pale: "#ede9fe", onDark: "#f5f0ff" },
];

interface ThemeContextType {
  theme: ThemeColors;
  themeIndex: number;
  cycleTheme: () => void;
  themes: ThemeColors[];
  setThemeIndex: (i: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES[0],
  themeIndex: 0,
  cycleTheme: () => {},
  themes: THEMES,
  setThemeIndex: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = THEMES[themeIndex];

  const cycleTheme = () => setThemeIndex(i => (i + 1) % THEMES.length);

  const cssVars = {
    "--c-bg":          theme.bg,
    "--c-dark":        theme.dark,
    "--c-accent":      theme.accent,
    "--c-soft":        theme.soft,
    "--c-pale":        theme.pale,
    "--c-on-dark":     theme.onDark,
    "--c-dark-60":     wo(theme.dark, 0.60),
    "--c-dark-55":     wo(theme.dark, 0.55),
    "--c-dark-50":     wo(theme.dark, 0.50),
    "--c-dark-40":     wo(theme.dark, 0.40),
    "--c-dark-30":     wo(theme.dark, 0.30),
    "--c-dark-25":     wo(theme.dark, 0.25),
    "--c-dark-20":     wo(theme.dark, 0.20),
    "--c-dark-15":     wo(theme.dark, 0.15),
    "--c-dark-12":     wo(theme.dark, 0.12),
    "--c-dark-10":     wo(theme.dark, 0.10),
    "--c-dark-08":     wo(theme.dark, 0.08),
    "--c-dark-05":     wo(theme.dark, 0.05),
    "--c-on-dark-85":  wo(theme.onDark, 0.85),
    "--c-on-dark-75":  wo(theme.onDark, 0.75),
    "--c-on-dark-65":  wo(theme.onDark, 0.65),
    "--c-on-dark-60":  wo(theme.onDark, 0.60),
    "--c-on-dark-55":  wo(theme.onDark, 0.55),
    "--c-on-dark-45":  wo(theme.onDark, 0.45),
    "--c-on-dark-30":  wo(theme.onDark, 0.30),
    "--c-on-dark-20":  wo(theme.onDark, 0.20),
    "--c-on-dark-10":  wo(theme.onDark, 0.10),
    "--c-on-dark-07":  wo(theme.onDark, 0.07),
    "--c-accent-30":   wo(theme.accent, 0.30),
    "--c-accent-20":   wo(theme.accent, 0.20),
    "--c-accent-15":   wo(theme.accent, 0.15),
    "--c-accent-12":   wo(theme.accent, 0.12),
    "--c-accent-10":   wo(theme.accent, 0.10),
    "--c-accent-06":   wo(theme.accent, 0.06),
  } as React.CSSProperties;

  return (
    <ThemeContext.Provider value={{ theme, themeIndex, cycleTheme, themes: THEMES, setThemeIndex }}>
      <div style={{ ...cssVars, minHeight: "100dvh", background: "var(--c-bg)", transition: "background 0.4s ease, color 0.4s ease" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
