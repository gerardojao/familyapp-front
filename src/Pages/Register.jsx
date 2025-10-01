import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../Components/api";
import { soloFecha } from "../utils/date";

const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const EMPTY_EXPENSE = {
  Id:"", Foto:"", Fecha:"", Mes:"", Importe:"", NombreEgreso:"", Descripcion:"",
};

export default function Register({ expense, setExpense }) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const record = state.record;
  const isEdit = Boolean(state.edit === true && (state.id || record?.id));

  const [outTypes, setOutTypes] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const setField = (name, value) => setExpense(prev => ({ ...prev, [name]: value }));
  const handleChange = (e) => setField(e.target.name, e.target.value);

  const convertirImagen = (files) => {
    const file = files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setField("Foto", String(reader.result));
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    (async () => {
      try { const res = await api.get("/Egreso"); setOutTypes(res.data?.data || []); }
      catch { setOutTypes([]); }
    })();
  }, []);

  // ✅ Reset en crear; prefill en editar
  useEffect(() => {
    if (!isEdit) {
      setExpense(EMPTY_EXPENSE);
      return;
    }
    const r = record || {};
    setExpense({
      Id: state.id || r.id || "",
      Foto: r.foto ?? "",
      Fecha: r.fecha ? soloFecha(r.fecha) : "",
      Mes: r.mes ?? "",
      Importe: r.importe ?? "",
      NombreEgreso: r.tipoId ?? "",
      Descripcion: r.descripcion ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      if (!expense.NombreEgreso) return alert("Selecciona un tipo de egreso.");
      if (!expense.Mes) return alert("Selecciona el mes.");
      if (!expense.Importe) return alert("Indica el importe.");

      setSubmitting(true);

      if (isEdit) {
        const id = state.id || record?.id;
        await api.put(`/FichaEgreso/detalle/${id}`, {
          fecha: expense.Fecha || null,
          mes: expense.Mes || null,
          nombreEgreso: expense.NombreEgreso ? Number(expense.NombreEgreso) : null,
          descripcion: expense.Descripcion ?? null,
          importe: Number(expense.Importe ?? 0),
          foto: expense.Foto ?? null,
        });
        alert("Gasto actualizado");
        navigate("/egresos-detalle", { replace: true });
        return;
      }

      await api.post("/FichaEgreso", {
        Foto: expense.Foto || null,
        Fecha: expense.Fecha || null,
        Mes: expense.Mes,
        Importe: Number(expense.Importe),
        NombreEgreso: Number(expense.NombreEgreso),
        Descripcion: expense.Descripcion || null,
      });
      alert("Registro exitoso");
      navigate("/", { replace: true });
      setExpense(EMPTY_EXPENSE);
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
            {isEdit ? "Editar gasto" : "Registro de gasto"}
          </h2>
          {isEdit && (state.id || record?.id) && (
            <span className="text-xs rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-200 px-2 py-1">
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
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="NombreEgreso">Tipo de egreso</label>
          <select id="NombreEgreso" name="NombreEgreso" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            value={expense.NombreEgreso ?? ""} onChange={handleChange}>
            <option value="">Selecciona…</option>
            {outTypes.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
          </select>
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Foto">Foto (opcional)</label>
          <input id="Foto" type="file" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            accept="image/*" onChange={(e)=>convertirImagen(e.target.files)} />
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Fecha">Fecha</label>
            <input id="Fecha" type="date" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              name="Fecha" value={expense.Fecha ?? ""} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Mes">Mes</label>
            <select id="Mes" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              name="Mes" value={expense.Mes ?? ""} onChange={handleChange}>
              <option value="">Selecciona…</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Descripcion">Descripción</label>
            <input id="Descripcion" type="text" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              name="Descripcion" value={expense.Descripcion ?? ""} onChange={handleChange} placeholder="(opcional)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="Importe">Importe</label>
            <input id="Importe" type="number" step="0.01" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              name="Importe" value={expense.Importe ?? ""} onChange={handleChange} placeholder="0,00" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 bg-sky-600 text-white hover:bg-sky-700 transition disabled:opacity-60" type="submit" disabled={submitting}>
            {submitting ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar gasto" : "Registrar gasto")}
          </button>
          <button type="button" className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 bg-white text-slate-700 hover:bg-slate-50 ring-1 ring-slate-200 transition" onClick={()=>navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
