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

  // src/Components/AuthContext.jsx (resumen del login)
const login = async (email, password) => {
  const res = await api.post("/Auth/login", { email, password });

  // soporta distintas keys (token/Token, user/User, ok/Ok)
  const tok = res.data?.token ?? res.data?.Token;
  const usr = res.data?.user  ?? res.data?.User;

  if (!tok) throw new Error(res?.data?.message || "No se recibió token.");

  localStorage.setItem("fa_token", tok);
  if (usr) localStorage.setItem("fa_user", JSON.stringify(usr));
  setToken(tok);
  setUser(usr ?? null);

  // opcional: si el backend no manda user, lo traemos
  if (!usr) {
    try {
      const who = await api.get("/Auth/whoami");
      console.log("whoami", who);
      
      const u = { id: Number(who.data?.sub), email: who.data?.email, role: who.data?.role ?? "user" };
      localStorage.setItem("fa_user", JSON.stringify(u));
      setUser(u);
    } catch {/* ignore */}
  }

  return { token: tok, user: usr };
};


  const logout = () => {
    localStorage.removeItem("fa_token");
    localStorage.removeItem("fa_user");
    setToken(null); setUser(null);
  };

  const value = useMemo(() => ({ user, token, isAuthed, login, logout }), [user, token, isAuthed]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
