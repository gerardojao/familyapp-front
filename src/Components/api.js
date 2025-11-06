// src/Components/api.js
import axios from "axios";

const isDev = import.meta.env.DEV;

// En dev usa tu API local; en prod SIEMPRE usa el proxy /api (Vercel rewrites)
const baseURL =
  import.meta.env.VITE_API_BASE ??
  (isDev ? "https://localhost:7288/api" : "/api");

const api = axios.create({
  baseURL,
  timeout: 45000,
  withCredentials: true,   
});

// (opcional para verificar en prod)
if (!isDev) console.log("[API baseURL]", baseURL);

// -------- Auth: arranque con token si ya existe --------
const bootToken = localStorage.getItem("fa_token");
if (bootToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${bootToken}`;
}

// Mantén el header sync cuando alguien “inyecta” el token (p.ej. TrialGate)
window.addEventListener("fa:token:set", (ev) => {
  try {
    const detail = ev?.detail || {};
    const t = detail.token || localStorage.getItem("fa_token");
    if (t) {
      api.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  } catch {
    // no-op
  }
});

// -------- Interceptors --------
api.interceptors.request.use((config) => {
  // (opcional) doble-check por si otro código actualizó localStorage
  const t = localStorage.getItem("fa_token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      // Limpieza local y aviso global
      localStorage.removeItem("fa_token");
      localStorage.removeItem("fa_user");
      delete api.defaults.headers.common["Authorization"];
      window.dispatchEvent(new Event("fa:unauthorized"));
    }
    return Promise.reject(err);
  }
);

export default api;
