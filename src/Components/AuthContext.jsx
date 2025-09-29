import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "./api";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fa_user")) || null; } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("fa_token") || null);
  const isAuthed = !!token;

  useEffect(() => {
    const onUnauthorized = () => { setToken(null); setUser(null); };
    window.addEventListener("fa:unauthorized", onUnauthorized);
    return () => window.removeEventListener("fa:unauthorized", onUnauthorized);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/Auth/login", { email, password });
    const t = res.data?.token;
    const u = res.data?.user ?? { email };
    if (!t) throw new Error("No se recibió token");
    localStorage.setItem("fa_token", t);
    localStorage.setItem("fa_user", JSON.stringify(u));
    setToken(t); setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem("fa_token");
    localStorage.removeItem("fa_user");
    setToken(null); setUser(null);
  };

  const value = useMemo(() => ({ user, token, isAuthed, login, logout }), [user, token, isAuthed]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
