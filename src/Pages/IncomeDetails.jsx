import React, { useEffect, useState, useCallback, useMemo } from "react";
import api from "../Components/api";
import Loader from "../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { soloFecha } from "../utils/date";
import {
  Search, RotateCcw, ArrowLeft, CalendarDays, XCircle, Pencil, Trash2,
} from "lucide-react";

const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const ymd = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function IncomeDetails() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  const total = useMemo(() => rows.reduce((acc, x) => acc + Number(x.importe ?? 0), 0), [rows]);

  const loadTipos = useCallback(async () => {
    try {
      const res = await api.get("/Ingreso");
      setTipos(res.data?.data ?? []);
    } catch {
      setTipos([]);
    }
  }, []);

  const fetchData = useCallback(
    async (opts = {}) => {
      setLoading(true);
      try {
        const f = opts.from ?? from;
        const t = opts.to ?? to;
        const tid = opts.tipoId ?? tipoId;

        const params = new URLSearchParams();
        if (f) params.set("fechaInicio", f);
        if (t) params.set("fechaFin", t);
        if (tid) params.set("tipoId", tid);

        const res = await api.get(`/Ingreso/detalle?${params.toString()}`);
        const list = res.data?.data?.[0] ?? [];
        setRows(Array.isArray(list) ? list : []);
      } catch {
        setRows([]);
      } finally {
        setLoading(false);
      }
    },
    [from, to, tipoId]
  );

  useEffect(() => {
    loadTipos();
    fetchData();
  }, [loadTipos, fetchData]);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  const onClear = () => {
    setFrom("");
    setTo("");
    setTipoId("");
    fetchData({ from: "", to: "", tipoId: "" });
  };

  // Rangos rápidos
  const setThisMonth = () => {
    const now = new Date();
    const f = ymd(new Date(now.getFullYear(), now.getMonth(), 1));
    const t = ymd(new Date(now.getFullYear(), now.getMonth() + 1, 0));
    setFrom(f);
    setTo(t);
    fetchData({ from: f, to: t });
  };
  const setLast30 = () => {
    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - 30);
    const f = ymd(past),
      t = ymd(now);
    setFrom(f);
    setTo(t);
    fetchData({ from: f, to: t });
  };
  const setThisYear = () => {
    const now = new Date();
    const f = ymd(new Date(now.getFullYear(), 0, 1));
    const t = ymd(new Date(now.getFullYear(), 11, 31));
    setFrom(f);
    setTo(t);
    fetchData({ from: f, to: t });
  };

  // Acciones
  const onEdit = (row) => navigate("/register-income", { state: { edit: true, record: row } });
  const onDelete = async (row) => {
    if (!confirm("¿Eliminar este ingreso?")) return;
    try {
      await api.delete(`/Ingreso/detalle/${row.id}`);
      setRows((prev) => prev.filter((x) => x.id !== row.id));
    } catch {
      alert("No se pudo eliminar.");
    }
  };

  return (
    <>
      {/* Header + volver */}
      <div className="flex items-center justify-between gap-3 mt-2 mb-6 md:mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">Detalle de ingresos</h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-slate-700 text-white hover:bg-slate-800 transition"
        >
          <ArrowLeft size={18} /> Volver
        </Link>
      </div>

      {/* Filtros */}
      <form
        className="rounded-2xl bg-white/80 backdrop-blur shadow-sm ring-1 ring-slate-200 p-4 md:p-5 mb-6"
        onSubmit={onSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="from">
              Desde
            </label>
            <input
              id="from"
              type="date"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="to">
              Hasta
            </label>
            <input
              id="to"
              type="date"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="tipo">
              Tipo
            </label>
            <select
              id="tipo"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={tipoId}
              onChange={(e) => setTipoId(e.target.value)}
            >
              <option value="">Todos</option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombreIngreso ?? t.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              <Search size={18} /> {loading ? "Buscando..." : "Buscar"}
            </button>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-white text-slate-700 hover:bg-slate-50 ring-1 ring-slate-200 transition"
            >
              <RotateCcw size={18} /> Limpiar
            </button>
          </div>
        </div>

        {/* Rangos rápidos */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-500 flex items-center gap-2">
            <CalendarDays size={16} /> Rápidos:
          </span>
          <button
            type="button"
            onClick={setThisMonth}
            className="rounded-full px-3 py-1 text-sm bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100 transition"
          >
            Este mes
          </button>
          <button
            type="button"
            onClick={setLast30}
            className="rounded-full px-3 py-1 text-sm bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100 transition"
          >
            Últimos 30 días
          </button>
          <button
            type="button"
            onClick={setThisYear}
            className="rounded-full px-3 py-1 text-sm bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100 transition"
          >
            Este año
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-full px-3 py-1 text-sm bg-rose-50 text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100 transition"
          >
            <XCircle size={14} className="inline -mt-0.5" /> Quitar filtro
          </button>
        </div>
      </form>

      {/* LISTA MÓVIL */}
      <section className="md:hidden space-y-3">
        {loading ? (
          <div className="rounded-2xl bg-white/80 backdrop-blur shadow-sm ring-1 ring-slate-200 p-4">
            <Loader />
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl bg-white/80 backdrop-blur shadow-sm ring-1 ring-slate-200 p-4 text-slate-500">
            Sin resultados
          </div>
        ) : (
          rows.map((r) => (
            <article key={r.id} className="rounded-2xl border border-slate-200 bg-white/70 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-800">
                    {r.fecha ? soloFecha(r.fecha) : "—"}
                    <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ring-1 bg-emerald-50 text-emerald-700 ring-emerald-200">
                      Ingreso
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {r.tipo ?? "—"} · {r.mes ?? "—"}
                  </div>
                  <div className="text-sm text-slate-700 mt-1 truncate">{r.descripcion ?? "—"}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-semibold text-emerald-700">{eur.format(Number(r.importe ?? 0))}</div>
                  <div className="mt-2 flex justify-end gap-1">
                    <button
                      onClick={() => onEdit(r)}
                      className="inline-flex items-center rounded-md px-2 py-1 bg-sky-600 text-white text-xs hover:bg-sky-700"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(r)}
                      className="inline-flex items-center rounded-md px-2 py-1 bg-rose-600 text-white text-xs hover:bg-rose-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* TABLA DESKTOP */}
      <section className="hidden md:block rounded-2xl bg-white/80 backdrop-blur shadow-sm ring-1 ring-slate-200 p-4 md:p-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-500">
                Resultados: <span className="font-medium text-slate-700">{rows.length}</span>
              </div>
              <div className="text-sm font-medium text-slate-600">
                Total: <span className="text-slate-900">{eur.format(total)}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="max-h-[520px] overflow-y-auto">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
                    <tr className="text-left text-slate-600">
                      <th className="py-2.5 px-3 font-semibold">Fecha</th>
                      <th className="py-2.5 px-3 font-semibold">Mes</th>
                      <th className="py-2.5 px-3 font-semibold">Tipo</th>
                      <th className="py-2.5 px-3 font-semibold">Descripción</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Importe</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.length === 0 ? (
                      <tr>
                        <td className="py-6 px-3 text-slate-500" colSpan={6}>
                          Sin resultados
                        </td>
                      </tr>
                    ) : (
                      rows.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-medium text-slate-800 whitespace-nowrap">
                            {r.fecha ? soloFecha(r.fecha) : "—"}
                          </td>
                          <td className="py-2.5 px-3">{r.mes ?? "—"}</td>
                          <td className="py-2.5 px-3">{r.tipo ?? "—"}</td>
                          <td className="py-2.5 px-3 text-slate-700">{r.descripcion ?? "—"}</td>
                          <td className="py-2.5 px-3 text-right font-semibold text-emerald-700 whitespace-nowrap">
                            {eur.format(Number(r.importe ?? 0))}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => onEdit(r)}
                                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 bg-sky-600 text-white hover:bg-sky-700"
                              >
                                <Pencil size={16} /> Editar
                              </button>
                              <button
                                onClick={() => onDelete(r)}
                                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 bg-rose-600 text-white hover:bg-rose-700"
                              >
                                <Trash2 size={16} /> Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot className="bg-slate-50">
                    <tr>
                      <th className="py-2.5 px-3 text-right font-semibold" colSpan={5}>
                        Total
                      </th>
                      <th className="py-2.5 px-3 text-right font-bold text-slate-900">{eur.format(total)}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
