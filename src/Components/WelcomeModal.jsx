import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function WelcomeModal({ open, name, onClose, onLogin }) {
  if (!open) return null;

  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 p-6">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-500 hover:text-slate-800"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <CheckCircle2 className="text-emerald-600" size={24} />
          <h3 className="text-lg font-semibold text-slate-900">Registro completado</h3>
        </div>

        <p className="text-slate-700">
          ¡Bienvenido, <span className="font-semibold">{name}</span>! Te has registrado satisfactoriamente.
        </p>

        <div className="mt-5 flex gap-2 justify-end">
          <button
            onClick={onLogin}
            className="inline-flex items-center rounded-xl px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Ir al login
          </button>
        </div>
      </div>
    </div>
  );
}
