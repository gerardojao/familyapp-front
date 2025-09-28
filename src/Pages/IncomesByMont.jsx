import React, { useEffect, useState } from "react";
import api from "../Components/api";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS, Colors, ArcElement, Tooltip, Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Colors, Tooltip, Legend);

const IncomeByMonth = () => {
  const [rows, setRows] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchData = async () => {
    try {
      const url =
        from && to
          ? `/Ingreso/totalesPorMes?fechaInicio=${from}&fechaFin=${to}`
          : `/Ingreso/totales`;
      const res = await api.get(url);
      setRows(res.data?.data?.[0] ?? []);
    } catch (e) {
      console.error(e);
      setRows([]);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const data = {
    labels: rows.map(r => r.cuenta_Ingreso),
    datasets: [{ data: rows.map(r => r.total) }],
  };
console.log(data);

  const options = {
    responsive: true,
    plugins: { legend: { position: "left" }, tooltip: { enabled: true } },
  };

  const onSubmit = (e) => { e.preventDefault(); fetchData(); };
  const onClear  = () => { setFrom(""); setTo(""); fetchData(); };

  return (
    <>
      <Link to="/" className="btn btn-secondary mb-3">Volver</Link>
      <h2 className="mb-3">Ingresos por rango de fecha</h2>

      <form className="row g-2 align-items-end" onSubmit={onSubmit}>
        <div className="col-sm-3">
          <label className="form-label">Desde</label>
          <input type="date" className="form-control"
                 value={from} onChange={e=>setFrom(e.target.value)} />
        </div>
        <div className="col-sm-3">
          <label className="form-label">Hasta</label>
          <input type="date" className="form-control"
                 value={to} onChange={e=>setTo(e.target.value)} />
        </div>
        <div className="col-sm-auto">
          <button className="btn btn-primary" type="submit">Buscar</button>
        </div>
        <div className="col-sm-auto">
          <button className="btn btn-outline-secondary" type="button" onClick={onClear}>Limpiar</button>
        </div>
      </form>

      <div className="my-3 table-responsive">
        <table className="table table-striped align-middle">
          <thead><tr><th>Tipo de ingreso</th><th>Total</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}><td>{r.cuenta_Ingreso}</td><td>{r.total}</td></tr>
            ))}
            {rows.length===0 && (
              <tr><td colSpan={2} className="text-muted">Sin resultados</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="btn btn-success mb-3" onClick={()=>setShowGraph(v=>!v)}>
        {showGraph ? "Ocultar gráfico" : "Mostrar gráfico"}
      </button>

      {showGraph && (
        <div style={{maxWidth: 420}}>
          <Doughnut data={data} options={options} />
        </div>
      )}
    </>
  );
};

export default IncomeByMonth;
