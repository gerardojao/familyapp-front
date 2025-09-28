import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../Components/api";

const months = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

const RegisterIncome = ({ income, setIncome }) => {
  const navigate = useNavigate();
  const [incTypes, setIncTypes] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // ---- helpers
  const setField = (name, value) => setIncome((prev) => ({ ...prev, [name]: value }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
  };

  const handleTipoIngresoChange = (e) => {
    const value = e.target.value;            // id seleccionado (string)
    const selected = incTypes.find(t => String(t.id) === String(value));
    // Guardamos ambos: id y nombre
    setField("IngresoId", value);
    setField("NombreIngreso", selected?.nombreIngreso || "");
  };

  const convertirImagen = (fileList) => {
    const file = fileList?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setField("Foto", String(reader.result)); // dataURL base64
    reader.readAsDataURL(file);
  };

  const loadTiposIngreso = async () => {
    // Tu endpoint original
    const res = await api.get("/Ingreso");
    // asume { data: { data: [...] } }
    setIncTypes(res.data?.data || []);
  };

  useEffect(() => { loadTiposIngreso(); }, []);

  const RegistrarIngreso = async (e) => {
    e.preventDefault();
    if (submitting) return;
    try {
      // Validaciones mínimas
      if (!income.IngresoId && !income.NombreIngreso) {
        alert("Selecciona un tipo de ingreso.");
        return;
      }
      if (!income.Mes) { alert("Selecciona el mes."); return; }
      if (!income.Importe) { alert("Indica el importe."); return; }

      setSubmitting(true);

      // ---- Construye el payload según tu API ----
      // Variante A: si TU API espera ID del tipo de ingreso:
      const payloadConId = {
        Foto: income.Foto || null,
        Fecha: income.Fecha || null,
        Mes: income.Mes,
        Importe: Number(income.Importe),
        IngresoId: Number(income.IngresoId),       // <-- clave con ID
        // NombreIngreso opcional si tu API lo ignora
        NombreIngreso: income.NombreIngreso || null,

      };

      // Variante B: si TU API espera el nombre (como venías enviando):
      const payloadConNombre = {
        Foto: income.Foto || null,
        Fecha: income.Fecha || null,
        Mes: income.Mes,
        Importe: Number(income.Importe),
        NombreIngreso: Number(income.IngresoId),
        Descripcion: income.Descripcion || null
      };

      // —— Elige UNA de las dos variantes:
      const payload = payloadConNombre; // <- usa esta si tu backend espera NombreIngreso
      // const payload = payloadConId;  // <- usa esta si tu backend espera un Id

      // Tu endpoint original:
      await api.post("/FichaIngreso/Create", payload);

      alert("Registro exitoso");
      navigate("/");

      // (opcional) limpiar el estado
      setIncome({
        Id: "",
        Foto: "",
        Fecha: "",
        Mes: "",
        Importe: "",
        NombreIngreso: "",
        IngresoId: "",
        Descripcion: ""
      });
    } catch (err) {
      console.error(err);
      alert("No se pudo registrar el ingreso. Revisa la consola para más detalle.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="containerPrincipal" onSubmit={RegistrarIngreso}>
      <Link to="/" className="btn btn-secondary mb-3">Volver</Link>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h4">Registro de Ingreso</h2>

          <div className="form-group mb-3">
            <label>Tipo de ingreso</label>
            <select
              className="form-control"
              onChange={handleTipoIngresoChange}
              value={income.IngresoId || ""}
            >
              <option value="">Selecciona…</option>
              {incTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombreIngreso}
                </option>
              ))}
            </select>
            {/* Valor visible (opcional para debug) */}
            {/* <small className="text-muted">Nombre: {income.NombreIngreso || "-"}</small> */}
          </div>

          <div className="form-group mb-3">
            <label>Foto (opcional)</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e)=>convertirImagen(e.target.files)}
            />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Fecha</label>
              <input
                type="date"
                className="form-control"
                name="Fecha"
                value={income.Fecha || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Mes</label>
              <select
                className="form-control"
                name="Mes"
                value={income.Mes || ""}
                onChange={handleChange}
              >
                <option value="">Selecciona…</option>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>Descripción</label>
              <input
                type="text"
                className="form-control"
                name="Descripcion"
                value={income.Descripcion || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Importe</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="Importe"
                value={income.Importe || ""}
                onChange={handleChange}
                placeholder="0,00"
              />
            </div>
          </div>

          <button className="btn btn-success" disabled={submitting}>
            {submitting ? "Enviando…" : "Registrar ingreso"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterIncome;
