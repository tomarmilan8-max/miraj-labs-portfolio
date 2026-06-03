import { useEffect, useState } from "react";
import { Menu, X, Palette, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation } from "wouter";

interface NavProps {
  onLogin: () => void;
}

export default function Nav({ onLogin }: NavProps) {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [themeOpen, setThemeOpen]       = useState(false);
  const { isAdmin, logout }             = useAuth();
  const { theme, themes, setThemeIndex, themeIndex } = useTheme();
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { id: "work",     label: "Our Work" },
    { id: "why",      label: "Why a Website" },
    { id: "founders", label: "Founders" },
    { id: "contact",  label: "Contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "color-mix(in srgb, var(--c-bg) 92%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--c-dark-10)" : "1px solid transparent",
          paddingTop: scrolled ? "10px" : "18px",
          paddingBottom: scrolled ? "10px" : "18px",
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "0.12em", color: "var(--c-dark)" }}>
            MIRAJ LABS
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {links.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--c-accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--c-dark)")}>
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setThemeOpen(o => !o)}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                style={{ background: "var(--c-pale)", color: "var(--c-dark)" }}
                title="Change theme"
                onMouseEnter={e => (e.currentTarget.style.background = "var(--c-accent-15)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--c-pale)")}>
                <Palette size={16} />
              </button>
              {themeOpen && (
                <div className="absolute right-0 top-12 p-3 z-50"
                  style={{ background: "var(--c-bg)", borderRadius: "14px", boxShadow: "0 8px 32px var(--c-dark-20)", border: "1px solid var(--c-dark-10)", minWidth: "160px" }}>
                  <p className="text-xs font-medium uppercase tracking-widest mb-2 px-1"
                    style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>Themes</p>
                  {themes.map((t, i) => (
                    <button key={t.name} onClick={() => { setThemeIndex(i); setThemeOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all"
                      style={{
                        borderRadius: "10px",
                        background: themeIndex === i ? "var(--c-pale)" : "transparent",
                        color: "var(--c-dark)",
                        fontFamily: "'Inter', sans-serif",
                      }}>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ background: t.dark }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: t.accent }} />
                      </div>
                      {t.name}
                      {themeIndex === i && <span className="ml-auto text-xs" style={{ color: "var(--c-accent)" }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate("/admin")}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all"
                  style={{ background: "var(--c-pale)", color: "var(--c-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--c-on-dark)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-pale)"; (e.currentTarget as HTMLElement).style.color = "var(--c-dark)"; }}>
                  <ShieldCheck size={15} /> Admin
                </button>
                <button onClick={logout}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                  style={{ background: "var(--c-pale)", color: "var(--c-dark)" }}
                  title="Logout"
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--c-accent-15)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--c-pale)")}>
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button onClick={onLogin}
                className="text-sm font-medium px-4 py-2 transition-all"
                style={{ background: "var(--c-pale)", color: "var(--c-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--c-on-dark)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-pale)"; (e.currentTarget as HTMLElement).style.color = "var(--c-dark)"; }}>
                Admin Login
              </button>
            )}
          </div>

          <button className="flex md:hidden w-10 h-10 items-center justify-center rounded-xl transition-all"
            style={{ background: "var(--c-pale)", color: "var(--c-dark)" }}
            onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col"
          style={{ background: "var(--c-bg)", paddingTop: "80px" }}>
          <div className="flex flex-col px-6 py-8 gap-2">
            {links.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-left py-4 text-2xl border-b transition-colors"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: "var(--c-dark)",
                  borderColor: "var(--c-dark-10)",
                  letterSpacing: "0.04em",
                }}>
                {label}
              </button>
            ))}
            <div className="pt-6 space-y-3">
              {isAdmin ? (
                <>
                  <button onClick={() => { setMobileOpen(false); navigate("/admin"); }}
                    className="w-full py-3.5 text-sm font-medium"
                    style={{ background: "var(--c-accent)", color: "var(--c-on-dark)", borderRadius: "12px", fontFamily: "'Inter', sans-serif" }}>
                    Go to Admin Panel
                  </button>
                  <button onClick={() => { logout(); setMobileOpen(false); }}
                    className="w-full py-3.5 text-sm font-medium"
                    style={{ background: "var(--c-pale)", color: "var(--c-dark)", borderRadius: "12px", fontFamily: "'Inter', sans-serif" }}>
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={() => { onLogin(); setMobileOpen(false); }}
                  className="w-full py-3.5 text-sm font-medium"
                  style={{ background: "var(--c-pale)", color: "var(--c-dark)", borderRadius: "12px", fontFamily: "'Inter', sans-serif" }}>
                  Admin Login
                </button>
              )}
              <div className="pt-2">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-dark-40)", fontFamily: "'Inter', sans-serif" }}>Color Theme</p>
                <div className="flex gap-3">
                  {themes.map((t, i) => (
                    <button key={t.name} onClick={() => setThemeIndex(i)}
                      className="flex flex-col items-center gap-1.5"
                      style={{ opacity: themeIndex === i ? 1 : 0.5 }}>
                      <div className="flex gap-0.5">
                        <div className="w-5 h-5 rounded-full" style={{ background: t.dark }} />
                        <div className="w-5 h-5 rounded-full" style={{ background: t.accent }} />
                      </div>
                      <span className="text-xs" style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }}>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {themeOpen && <div className="fixed inset-0 z-40" onClick={() => setThemeOpen(false)} />}
    </>
  );
}
