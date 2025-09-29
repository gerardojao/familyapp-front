// src/Pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd]     = useState("");
  const [show, setShow]   = useState(false);
  const [busy, setBusy]   = useState(false);
  const [err, setErr]     = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !pwd) { setErr("Completa tus credenciales."); return; }
    try {
      setBusy(true);
      await login(email.trim(), pwd);
      nav("/"); // éxito
    } catch (ex) {
      const msg = ex?.response?.data?.message || ex?.message || "Error al iniciar sesión";
      setErr(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-slate-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 text-center">Iniciar sesión</h1>
        <p className="text-sm text-slate-600 text-center mt-1">Accede a tu cuenta FamilyApp</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {err && <div className="rounded-lg bg-rose-50 text-rose-700 px-3 py-2 text-sm ring-1 ring-rose-200">{err}</div>}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              autoComplete="username"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="tucorreo@dominio.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="••••••••"
                value={pwd}
                onChange={(e)=>setPwd(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                onClick={()=>setShow(s=>!s)}
                aria-label="Mostrar contraseña"
              >
                {show ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          <button
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-60"
            disabled={busy}
            type="submit"
          >
            <LogIn size={18}/> {busy ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to="/" className="text-slate-600 hover:text-slate-900">Volver al inicio</Link>
          <Link to="/forgot" className="text-emerald-700 hover:text-emerald-800">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  );
}
