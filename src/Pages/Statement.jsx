// src/Pages/Statement.jsx
import React, { useEffect, useState } from "react";
import api from "../Components/api";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { currency } from "../utils/format";

function Statement() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIncomes = async () => {
    const res = await api.get("/Ingreso/totales");
    setIncomes(res.data.data[0] || []);
  };
  const getExpenses = async () => {
    const res = await api.get("/Egreso/totales");
    setExpenses(res.data.data[0] || []);
  };

  useEffect(() => {
    Promise.all([getIncomes(), getExpenses()]).finally(()=>setLoading(false));
  }, []);

  const totalIncomes = incomes.reduce((s,x)=> s + Number(x.total||0), 0);
  const totalExpenses = expenses.reduce((s,x)=> s + Number(x.total||0), 0);
  const balance = totalIncomes - totalExpenses;

  if (loading) return <Loader />;

  return (
    <div>
      <Link to="/" className="btn btn-secondary mb-3">Volver</Link>
      <h2 className="mb-3">Relación de Ingresos y Gastos</h2>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="card shadow-sm text-bg-success">
            <div className="card-body">
              <div className="fw-semibold">Total ingresos</div>
              <div className="display-6">{currency(totalIncomes)}</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-bg-danger">
            <div className="card-body">
              <div className="fw-semibold">Total gastos</div>
              <div className="display-6">{currency(totalExpenses)}</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card shadow-sm ${balance>=0?"text-bg-primary":"text-bg-warning"}`}>
            <div className="card-body">
              <div className="fw-semibold">{balance>=0?"Ganancia":"Pérdida"}</div>
              <div className="display-6">{currency(balance)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header"><h5 className="m-0">Ingresos</h5></div>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead><tr><th>Tipo</th><th>Total</th></tr></thead>
                <tbody>
                  {incomes.map((i,idx)=>(<tr key={idx}><td>{i.cuenta_Ingreso}</td><td>{currency(i.total)}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header"><h5 className="m-0">Gastos</h5></div>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead><tr><th>Tipo</th><th>Total</th></tr></thead>
                <tbody>
                  {expenses.map((e,idx)=>(<tr key={idx}><td>{e.cuenta_Egreso}</td><td>{currency(e.total)}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default Statement;
