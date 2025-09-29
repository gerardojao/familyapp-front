// src/Components/api.js
import axios from "axios";

const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE ?? "/api",
baseURL: " https://localhost:7288/api" 
});

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
      // Notificar y limpiar
      localStorage.removeItem("fa_token");
      localStorage.removeItem("fa_user");
      window.dispatchEvent(new Event("fa:unauthorized"));
    }
    return Promise.reject(err);
  }
);

export default api;
