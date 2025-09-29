import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../Components/api";
import { soloFecha } from "../utils/date";

const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const EMPTY_INCOME = {
  Id: "", Foto: "", Fecha: "", Mes: "", Importe: "",
  NombreIngreso: "", IngresoId: "", Descripcion: "",
};

export default function RegisterIncome({ income, setIncome }) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const record = state.record;
  // ✅ Edición solo si viene marcado por state y con id claro
  const isEdit = Boolean(state.edit === true && (state.id || record?.id));

  const [incTypes, setIncTypes] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const setField = (name, value) => setIncome(prev => ({ ...prev, [name]: value }));
  const handleChange = (e) => setField(e.target.name, e.target.value);

  const handleTipoIngresoChange = (e) => {
    const value = e.target.value;
    const selected = incTypes.find(t => String(t.id) === String(value));
    setField("IngresoId", value);
    setField("NombreIngreso", selected?.nombreIngreso || "");
  };

  const convertirImagen = (files) => {
    const file = files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setField("Foto", String(reader.result));
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    (async () => {
      try { const res = await api.get("/Ingreso"); setIncTypes(res.data?.data || []); }
      catch { setIncTypes([]); }
    })();
  }, []);

  // ✅ Reset duro al entrar en "crear"; prefill cuando es "editar"
  useEffect(() => {
    if (!isEdit) {
      setIncome(EMPTY_INCOME);
      return;
    }
    const r = record || {};
    setIncome({
      Id: state.id || r.id || "",
      Foto: r.foto ?? "",
      Fecha: r.fecha ? soloFecha(r.fecha) : "",
      Mes: r.mes ?? "",
      Importe: r.importe ?? "",
      IngresoId: r.tipoId ?? "",
      NombreIngreso: r.tipo ?? "",
      Descripcion: r.descripcion ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      if (!income.IngresoId) return alert("Selecciona un tipo de ingreso.");
      if (!income.Mes) return alert("Selecciona el mes.");
      if (!income.Importe) return alert("Indica el importe.");

      setSubmitting(true);

      if (isEdit) {
        const id = state.id || record?.id;
        await api.put(`/Ingreso/detalle/${id}`, {
          fecha: income.Fecha || null,
          mes: income.Mes || null,
          nombreIngreso: income.IngresoId ? Number(income.IngresoId) : null,
          descripcion: income.Descripcion ?? null,
          importe: Number(income.Importe ?? 0),
          foto: income.Foto ?? null,
        });
        alert("Ingreso actualizado");
        navigate("/ingresos-detalle", { replace: true });
        return;
      }

      // Crear
      await api.post("/FichaIngreso/Create", {
        Foto: income.Foto || null,
        Fecha: income.Fecha || null,
        Mes: income.Mes,
        Importe: Number(income.Importe),
        NombreIngreso: Number(income.IngresoId), // FK esperado por tu API
        Descripcion: income.Descripcion || null,
      });
      alert("Registro exitoso");
      navigate("/", { replace: true });
      setIncome(EMPTY_INCOME);
    } catch (err) {
      console.error(err);
      alert((isEdit ? "No se pudo actualizar: " : "No se pudo registrar: ") + (err?.response?.data?.message || err?.message || "Error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3 mt-2 mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            {isEdit ? "Editar ingreso" : "Registro de ingreso"}
          </h2>
          {isEdit && (state.id || record?.id) && (
            <span className="text-xs rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2 py-1">
              ID #{state.id || record?.id}
            </span>
          )}
        </div>
        <Link to="/" className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-slate-700 text-white hover:bg-slate-800 transition">
          <ArrowLeft size={18} /> Volver
        </Link>
      </div>

      <form className="rounded-2xl bg-white/80 backdrop-blur shadow-sm ring-1 ring-slate-200 p-4 md:p-5 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="TipoIngreso">Tipo de ingreso</label>
          <select id="TipoIngreso" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            onChange={handleTipoIngresoChange} value={income.IngresoId || ""}>
            <option value="">Selecciona…</option>
            {incTypes.map(t => <option key={t.id} value={t.id}>{t.nombreIngreso}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Foto">Foto (opcional)</label>
          <input id="Foto" type="file" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            accept="image/*" onChange={(e)=>convertirImagen(e.target.files)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Fecha">Fecha</label>
            <input id="Fecha" type="date" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              name="Fecha" value={income.Fecha || ""} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Mes">Mes</label>
            <select id="Mes" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              name="Mes" value={income.Mes || ""} onChange={handleChange}>
              <option value="">Selecciona…</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Descripcion">Descripción</label>
            <input id="Descripcion" type="text" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              name="Descripcion" value={income.Descripcion || ""} onChange={handleChange} placeholder="(opcional)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Importe">Importe</label>
            <input id="Importe" type="number" step="0.01" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              name="Importe" value={income.Importe || ""} onChange={handleChange} placeholder="0,00" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-60" type="submit" disabled={submitting}>
            {submitting ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar ingreso" : "Registrar ingreso")}
          </button>
          <button type="button" className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 bg-white text-slate-700 hover:bg-slate-50 ring-1 ring-slate-200 transition" onClick={()=>navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
