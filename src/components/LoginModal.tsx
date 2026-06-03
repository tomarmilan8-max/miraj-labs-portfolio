import { useState } from "react";
import { X, Lock, User, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const { login } = useAuth();
  const [, navigate] = useLocation();

  const handleClose = () => { setUsername(""); setPassword(""); setError(""); onClose(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(username.trim(), password);
    setLoading(false);
    if (ok) { handleClose(); navigate("/admin"); }
    else    { setError("Invalid username or password."); setPassword(""); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0" style={{ background: "var(--c-dark-40)", backdropFilter: "blur(8px)" }}
            onClick={handleClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div className="relative w-full max-w-sm z-10 p-8"
            style={{ background: "var(--c-bg)", borderRadius: "20px" }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}>

            <button onClick={handleClose} className="absolute top-5 right-5 transition-colors"
              style={{ color: "var(--c-dark-40)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--c-accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--c-dark-40)")}>
              <X size={20} />
            </button>

            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
              style={{ background: "var(--c-pale)" }}>
              <Lock size={20} style={{ color: "var(--c-accent)" }} />
            </div>

            <p className="text-xs font-medium uppercase tracking-widest mb-1"
              style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>Admin Access</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", lineHeight: 0.95, color: "var(--c-dark)", marginBottom: "6px" }}>
              Login
            </h2>
            <p className="text-sm mb-7" style={{ color: "var(--c-dark-55)", fontFamily: "'Inter', sans-serif" }}>
              Enter your admin credentials to manage the portfolio.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
                  style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>Username</label>
                <div className="flex items-center gap-3 px-4 py-3"
                  style={{ background: "var(--c-pale)", borderRadius: "10px", border: "1px solid var(--c-accent-12)" }}>
                  <User size={15} style={{ color: "var(--c-accent)", flexShrink: 0 }} />
                  <input type="text" value={username} onChange={e => { setUsername(e.target.value); setError(""); }}
                    placeholder="admin" autoComplete="username"
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-widest mb-1.5"
                  style={{ color: "var(--c-dark-50)", fontFamily: "'Inter', sans-serif" }}>Password</label>
                <div className="flex items-center gap-3 px-4 py-3"
                  style={{ background: "var(--c-pale)", borderRadius: "10px", border: "1px solid var(--c-accent-12)" }}>
                  <Lock size={15} style={{ color: "var(--c-accent)", flexShrink: 0 }} />
                  <input type={showPass ? "text" : "password"} value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••" autoComplete="current-password"
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: "var(--c-dark)", fontFamily: "'Inter', sans-serif" }} />
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    style={{ color: "var(--c-dark-40)" }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm" style={{ color: "var(--c-accent)", fontFamily: "'Inter', sans-serif" }}>{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full py-3 text-sm font-medium transition-all mt-2"
                style={{ background: loading ? "var(--c-dark-40)" : "var(--c-accent)", color: "var(--c-on-dark)", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}>
                {loading ? "Logging in…" : "Login to Admin"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
