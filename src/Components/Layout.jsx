// src/Components/Layout.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const primaryBtn   = "inline-flex items-center rounded-xl px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm";
const secondaryBtn = "inline-flex items-center rounded-xl px-4 py-2.5 bg-sky-600 text-white hover:bg-sky-700 transition shadow-sm";
const linkBtn      = "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 hover:text-slate-900 transition";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-sky-50 to-white">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between">
          {/* Logo (más pequeño en móvil) */}
          <Link to="/" className="font-extrabold tracking-tight text-slate-900 text-lg sm:text-xl">
            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">Family</span>App
          </Link>

          {/* Botón hamburguesa (móvil) */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Abrir menú"
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Navegación (desktop) */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/register-income" className={primaryBtn}>Nuevo ingreso</NavLink>
            <NavLink to="/register-expense" className={secondaryBtn}>Nuevo egreso</NavLink>
            <NavLink to="/statement" className={linkBtn}>Statement</NavLink>
          </nav>
        </div>

        {/* Panel móvil (colapsable) */}
        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex flex-col">
                <NavLink to="/register-income" className="px-3 py-2 rounded-lg hover:bg-emerald-50" onClick={()=>setOpen(false)}>
                  Nuevo ingreso
                </NavLink>
                <NavLink to="/register-expense" className="px-3 py-2 rounded-lg hover:bg-sky-50" onClick={()=>setOpen(false)}>
                  Nuevo egreso
                </NavLink>
                <NavLink to="/statement" className="px-3 py-2 rounded-lg hover:bg-slate-100" onClick={()=>setOpen(false)}>
                  Statement
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero (CTAs ocultas en móvil, visibles en md+) */}
      <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-4 md:pb-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 to-sky-50 p-6 md:p-10 ring-1 ring-slate-200 shadow-sm">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-20 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />

          <div className="relative">
            <h1 className="mt-1 text-center text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">Family</span>App
            </h1>
            <p className="mt-2 text-center text-slate-600 text-base md:text-lg">
              Controla tus ingresos y egresos con un panel moderno.
            </p>

            {/* CTA: sólo md+ (en móvil no es necesario mostrarlas) */}
            <div className="mt-5 hidden md:flex flex-wrap items-center justify-center gap-3">
              <Link to="/register-income" className={primaryBtn}>Nuevo ingreso</Link>
              <Link to="/register-expense" className={secondaryBtn}>Nuevo egreso</Link>
              <Link to="/statement" className={linkBtn}>Ver statement</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 pb-12 space-y-6 flex-1">
        {children}
      </main>

      {/* Footer */}
<footer className="mt-auto border-t border-slate-200 bg-white/80 backdrop-blur">
  <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
    <div
      className="
        flex flex-col items-center justify-center gap-3
        py-4 md:py-6
        text-sm text-slate-500
        md:flex-row md:justify-between
      "
    >
      {/* Izquierda (copy) */}
      <div className="order-2 md:order-1 text-center md:text-left">
        © {new Date().getFullYear()} FamilyApp
      </div>

      {/* Derecha (links) */}
      <nav className="order-1 md:order-2 w-full md:w-auto">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-4">
          <li>
            <a
              href="#"
              className="rounded-lg px-2 py-1.5 hover:text-slate-700 hover:bg-slate-100"
            >
              Privacidad
            </a>
          </li>
          <li className="hidden md:block text-slate-300">•</li>
          <li>
            <a
              href="#"
              className="rounded-lg px-2 py-1.5 hover:text-slate-700 hover:bg-slate-100"
            >
              Términos
            </a>
          </li>
          <li className="hidden md:block text-slate-300">•</li>
          <li>
            <a
              href="#"
              className="rounded-lg px-2 py-1.5 hover:text-slate-700 hover:bg-slate-100"
            >
              Soporte
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</footer>

    </div>
  );
}
