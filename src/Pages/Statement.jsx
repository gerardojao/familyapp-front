// src/Pages/Statement.jsx
import React, { useEffect, useState } from "react";
import api from "../Components/api";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { currency } from "../utils/currency";
import { ArrowLeft } from "lucide-react";
import { saveStatementSummary } from "../utils/statementStore";
import KPIs from "../Components/Kpi";

export default function Statement() {
  const [incomes, setIncomes] = useState([]);   // [{ cuenta_Ingreso/ Cuenta_Ingreso, total/Total }, ...]
  const [expenses, setExpenses] = useState([]); // [{ cuenta_Egreso / Cuenta_Egreso, total/Total }, ...]
  const [loading, setLoading] = useState(true);

  const getIncomes = async () => {
    const res = await api.get("/Ingreso/totales");
    // El backend devuelve en data[0]
    setIncomes(res?.data?.data?.[0] || []);
  };

  const getExpenses = async () => {
    const NAME_MAP = {
    "Transporte": "Gastos Casa",   
  };
    const res = await api.get("/Egreso/totales");
    const rawData = res?.data?.data?.[0] || [];
    const translatedData = rawData.map(item => {     
      const originalName = item.nombre ?? item.nombreEgreso; 
      
      console.log(originalName);
       
      return {
        ...item,
        nombre: NAME_MAP[originalName] || originalName 
      }
      });
    setExpenses(translatedData);
  };
   
  useEffect(() => {
    (async () => {
      try {
        await Promise.all([getIncomes(), getExpenses()]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Totales robustos (acepta Total/total)
  const totalIncomes = incomes.reduce(
    (s, x) => s + Number(x.total ?? x.Total ?? 0),
    0
  );
  const totalExpenses = expenses.reduce(
    (s, x) => s + Number(x.total ?? x.Total ?? 0),
    0
  );
  const balance = totalIncomes - totalExpenses;

  // Guarda el resumen para que HOME lo pueda leer
  useEffect(() => {
    if (loading) return;
    saveStatementSummary({
      // Si luego agregas filtros de fecha, setéalos aquí:
      from: null,
      to: null,
      totalIngresos: totalIncomes,
      totalEgresos: totalExpenses,
      balance,
      ts: Date.now(),
    });
  }, [loading, totalIncomes, totalExpenses, balance]);

  if (loading) return <section className="card p-4"><Loader /></section>;

  return (
    <>
      {/* Header + volver */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Relación de Ingresos y Gastos</h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-slate-700 text-white hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <ArrowLeft size={18} />
          Volver
        </Link>
      </div>

      {/* KPIs */}
      <KPIs  /* refreshKey={refreshKey} */ />

      {/* Tablas Ingresos / Gastos */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ingresos */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Ingresos</h3>
          <div className="table-wrap">
            <table className="table">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-500">
                  <th className="th">Tipo</th>
                  <th className="th text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((i, idx) => (
                  <tr key={idx} className="tr">
                    <td className="td">{i.cuenta_Ingreso ?? i.Cuenta_Ingreso}</td>
                    <td className="td text-right font-semibold text-emerald-700">
                      {currency(i.total ?? i.Total ?? 0)}
                    </td>
                  </tr>
                ))}
                {incomes.length === 0 && (
                  <tr>
                    <td className="td text-slate-500" colSpan={2}>Sin resultados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gastos */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Gastos</h3>
          <div className="table-wrap">
            <table className="table">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-500">
                  <th className="th">Tipo</th>
                  <th className="th text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e, idx) => (
                  <tr key={idx} className="tr">
                    <td className="td">{e.cuenta_Egreso ?? e.Cuenta_Egreso}</td>
                    <td className="td text-right font-semibold text-rose-700">
                      {currency(e.total ?? e.Total ?? 0)}
                    </td>
                  </tr>
                ))}
                {expenses.length === 0 && (
                  <tr>
                    <td className="td text-slate-500" colSpan={2}>Sin resultados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
