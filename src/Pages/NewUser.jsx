import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserPlus, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import api from "../Components/api";
import WelcomeModal from "../Components/WelcomeModal";

const inputCls = "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400";
const labelCls = "block text-sm font-medium text-slate-700 mb-1";

export default function NewUser() {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Leer returnUrl de la query, igual que en Login
  const params = new URLSearchParams(location.search);
  const qReturn = params.get("returnUrl") || "";

  // Ruta de login teniendo en cuenta returnUrl
  const loginPath = qReturn
    ? `/login?returnUrl=${encodeURIComponent(qReturn)}`
    : "/login";

  const [nombre, setNombre] = useState("");
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [pass2, setPass2]   = useState("");
  const [show1, setShow1]   = useState(false);
  const [show2, setShow2]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Modal de bienvenida
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");

  const validate = () => {
    setErr("");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return "Correo inválido";
    if (pass.length < 8) return "La contraseña debe tener al menos 8 caracteres";
    if (!/[A-Z]/.test(pass) || !/[a-z]/.test(pass) || !/[0-9]/.test(pass))
      return "La contraseña debe incluir al menos 1 mayúscula, 1 minúscula y 1 número";
    if (pass !== pass2) return "Las contraseñas no coinciden";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setErr(v); return; }

    setLoading(true);
    setErr("");
    try {
      const res = await api.post("/Auth/register", {
        nombre,        // el backend debe mapear "nombre" -> FullName
        email,
        password: pass
      });

      const okRes = res?.data?.ok ?? res?.data?.Ok ?? false;
      if (!okRes) {
        const msg = res?.data?.message || res?.data?.Message || "No se pudo registrar";
        throw new Error(msg);
      }

      const name =
        res?.data?.data?.user?.fullName ||
        nombre ||
        (email.includes("@") ? email.split("@")[0] : email);

      setWelcomeName(name);
      setShowWelcome(true);  // abre el modal
    } catch (error) {
      setErr(
        error?.response?.data?.message
        || error?.response?.data?.Message
        || error.message
        || "Error registrando el usuario"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft size={16}/> Volver
          </Link>
        </div>

        <div className="rounded-3xl bg-white/80 backdrop-blur ring-1 ring-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-emerald-100 p-2">
              <UserPlus className="text-emerald-700" size={22}/>
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Crear cuenta</h2>
          </div>

          {err && (
            <div className="mb-3 rounded-xl bg-rose-50 text-rose-700 px-3 py-2 text-sm">
              {err}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className={labelCls} htmlFor="nombre">Nombre (opcional)</label>
              <input
                id="nombre"
                className={inputCls}
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="email">Correo</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  className={inputCls + " pr-10"}
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="pass">Contraseña</label>
              <div className="relative">
                <input
                  id="pass"
                  type={show1 ? "text" : "password"}
                  className={inputCls + " pr-10"}
                  value={pass}
                  onChange={(e)=>setPass(e.target.value)}
                  placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-500"
                  onClick={()=>setShow1(s=>!s)}
                  aria-label={show1 ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {show1 ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="pass2">Repite la contraseña</label>
              <div className="relative">
                <input
                  id="pass2"
                  type={show2 ? "text" : "password"}
                  className={inputCls + " pr-10"}
                  value={pass2}
                  onChange={(e)=>setPass2(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-500"
                  onClick={()=>setShow2(s=>!s)}
                  aria-label={show2 ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {show2 ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm disabled:opacity-60"
            >
              <UserPlus size={18}/> {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            <p className="text-sm text-slate-600 text-center">
              ¿Ya tienes cuenta?{" "}
              <Link
                to={loginPath}
                className="text-slate-900 font-medium hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Modal de bienvenida */}
      <WelcomeModal
        open={showWelcome}
        name={welcomeName}
        onClose={() => {
          setShowWelcome(false);
          navigate(loginPath);        
        }}
        onLogin={() => navigate(loginPath)}
      />
    </>
  );
}
