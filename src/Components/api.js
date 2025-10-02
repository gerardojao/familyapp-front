// src/Components/api.js
import axios from "axios";

const isDev = import.meta.env.DEV;

// En dev usa tu API local; en prod SIEMPRE usa el proxy /api de Vercel
const baseURL =
  import.meta.env.VITE_API_BASE ??
  (isDev ? "https://localhost:7288/api" : "/api");

const api = axios.create({ baseURL });

// (opcional para verificar en prod)
if (!isDev) console.log("[API baseURL]", baseURL);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fa_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      localStorage.removeItem("fa_token");
      localStorage.removeItem("fa_user");
      window.dispatchEvent(new Event("fa:unauthorized"));
    }
    return Promise.reject(err);
  }
);

export default api;
