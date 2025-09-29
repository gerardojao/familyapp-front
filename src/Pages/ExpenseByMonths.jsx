import React, { useEffect, useState } from "react";
import api from "../Components/api";
import { Link } from "react-router-dom";
import DateRange from "../Components/DateRange";
import DonutCard from "../Components/DonutCard";
import {
  Chart as ChartJS, Colors, ArcElement, Tooltip, Legend
} from "chart.js";
ChartJS.register(ArcElement, Colors, Tooltip, Legend);

export default function ExpenseByMonths() {
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
    } catch (e) {
      console.error(e);
      setRows([]);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const data = {
    labels: rows.map(r => r.cuenta_Egreso),
    datasets: [{ data: rows.map(r => r.total) }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // importante para controlar la altura con Tailwind
    plugins: {
      legend: { position: "left" },
      tooltip: { enabled: true },
    },
  };

  return (
    <>
      {/* Cabecera + volver */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-slate-900">Gastos por rango de fecha</h2>
        <Link to="/" className="btn-ghost">Volver</Link>
      </div>

      {/* Filtros de fecha */}
      <section className="card p-4 mb-4">
        {/* Si tu DateRange usa Bootstrap por dentro, conviene migrarlo a Tailwind.
            Si no, al menos envuélvelo en este card para que mantenga el layout. */}
        <DateRange
          from={from} to={to}
          onChangeFrom={setFrom} onChangeTo={setTo}
          onSubmit={fetchData}
          onClear={() => { setFrom(""); setTo(""); fetchData(); }}
        />
      </section>

      {/* Tabla de totales */}
      <section className="card p-4 mb-4">
        <div className="table-wrap">
          <table className="table">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-500">
                <th className="th">Tipo de egreso</th>
                <th className="th text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="tr">
                  <td className="td">{r.cuenta_Egreso}</td>
                  <td className="td text-right font-semibold text-rose-700">
                    {Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(r.total ?? 0)}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="td text-slate-500" colSpan={2}>Sin resultados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <button
            className={showGraph ? "btn-ghost" : "btn-emerald"}
            onClick={() => setShowGraph(v => !v)}
          >
            {showGraph ? "Ocultar gráfico" : "Mostrar gráfico"}
          </button>
        </div>
      </section>

      {/* Gráfico */}
      {showGraph && (
        <section className="card p-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Distribución de gastos</h3>
          {/* Altura amplia, responsive */}
          <div className="h-[28rem] md:h-[32rem]">
            {/* Si DonutCard ya renderiza un <Doughnut> internamente,
                mejor pásale height/width via props o envuélvelo así */}
            <DonutCard title="" data={data} options={options} />
          </div>
        </section>
      )}
    </>
  );
}
