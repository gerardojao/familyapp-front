// src/Pages/Register.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../Components/api";

const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const Register = ({ expense, setExpense }) => {
  const navigate = useNavigate();
  const [outTypes, setOutTypes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense(prev => ({ ...prev, [name]: value }));
  };

  const convertirImagen = (fileList) => {
    const file = fileList?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result);
      setExpense(prev => ({ ...prev, Foto: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const RegistrarEgreso = async (e) => {
    e.preventDefault();
    try {
      if (!expense.NombreEgreso || !expense.Mes || !expense.Importe) {
        return alert("Completa los campos obligatorios.");
      }

      // 🔑 El backend espera int en NombreEgreso (FK) y decimal en Importe
      const payload = {
        Foto: expense.Foto || null,
        Fecha: expense.Fecha || null,        // "YYYY-MM-DD" sirve para DateTime
        Mes: expense.Mes,
        Importe: Number(expense.Importe),
        NombreEgreso: Number(expense.NombreEgreso) // <-- ID del egreso
      };

      await api.post("/FichaEgreso", payload);
      alert("Registro exitoso");
      navigate("/");

      // opcional: limpiar
      // setExpense({ Foto:"", Fecha:"", Mes:"", Importe:"", NombreEgreso:"" });
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.message || "Error";
      alert("No se pudo registrar el gasto: " + msg);
    }
  };

  const getOutcomes = async () => {
    const res = await api.get("/Egreso"); // devuelve { Ok, Data:[{Id, Nombre}], Message }
    setOutTypes(res.data?.data || []);
  };

  useEffect(()=>{ getOutcomes(); }, []);

  return (
    <form className="containerPrincipal" onSubmit={RegistrarEgreso}>
      <Link to="/" className="btn btn-secondary mb-3">Volver</Link>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h4">Registro de Gasto</h2>

          <div className="form-group mb-3">
            <label>Tipo de egreso</label>
            <select
              name="NombreEgreso"
              className="form-control"
              value={expense.NombreEgreso}
              onChange={handleChange}
            >
              <option value="">Selecciona…</option>
              {outTypes.map(o => (
                <option key={o.id} value={o.id}>
                  {o.nombre}
                </option>
              ))}
            </select>
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
                value={expense.Fecha}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Mes</label>
              <select
                className="form-control"
                name="Mes"
                value={expense.Mes}
                onChange={handleChange}
              >
                <option value="">Selecciona…</option>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>Importe</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="Importe"
                value={expense.Importe}
                onChange={handleChange}
                placeholder="0,00"
              />
            </div>
          </div>

          <button className="btn btn-danger">Registrar egreso</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
