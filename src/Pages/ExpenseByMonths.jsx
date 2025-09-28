// src/Pages/ExpenseByMonths.jsx
import React, { useEffect, useState } from "react";
import api from "../Components/api";
import { Link } from "react-router-dom";
import DateRange from "../Components/DateRange";
import DonutCard from "../Components/DonutCard";
import {
  Chart as ChartJS, Colors, ArcElement, Tooltip, Legend
} from "chart.js";
ChartJS.register(ArcElement, Colors, Tooltip, Legend);

const ExpenseByMonths = () => {
  const [rows, setRows] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchData = async () => {
    try {
      const url =
        from && to
          ? `/Egreso/totalesPorMes?fechaInicio=${from}&fechaFin=${to}`
          : `/Egreso/totales`;  
      
      const res = await api.get(url);      
      setRows(res.data?.data?.[0] ?? []);
      console.log(rows);
    } catch (e) {
      console.error(e);
      setRows([]);
    }
  };

  useEffect(()=>{ fetchData(); }, []); // primera carga

  const data = {
    labels: rows.map(r => r.cuenta_Egreso),
    datasets: [{ data: rows.map(r => r.total) }],
  };
console.log(data);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "left" },
      tooltip: { enabled: true },
    },
  };
console.log(rows);

  return (
    <>
      <Link to="/" className="btn btn-secondary mb-3">Volver</Link>
      <h2 className="mb-3">Gastos por rango de fecha</h2>

      <DateRange
        from={from} to={to}
        onChangeFrom={setFrom} onChangeTo={setTo}
        onSubmit={fetchData}
        onClear={()=>{ setFrom(""); setTo(""); fetchData(); }}
      />

      <div className="my-3 table-responsive">
        <table className="table table-striped align-middle">
          <thead><tr><th>Tipo de egreso</th><th>Total</th></tr></thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}><td>{r.cuenta_Egreso}</td><td>{r.total}</td></tr>
          ))}
          {rows.length===0 && <tr><td colSpan={2} className="text-muted">Sin resultados</td></tr>}
        </tbody>
        </table>
      </div>

      <button className="btn btn-success mb-3" onClick={()=>setShowGraph(v=>!v)}>
        {showGraph ? "Ocultar gráfico" : "Mostrar gráfico"}
      </button>

      {showGraph && <DonutCard title="Distribución de gastos" data={data} options={options} />}
    </>
  );
};
export default ExpenseByMonths;
