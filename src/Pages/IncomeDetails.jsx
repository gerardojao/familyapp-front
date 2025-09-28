import React, { useEffect, useState } from "react";
import api from "../Components/api";
import { Link } from "react-router-dom";
import { soloFecha } from "../utils/date";  

const IncomeDetails = () => {
  const [rows, setRows] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [tipos, setTipos] = useState([]);
  const [total, setTotal] = useState(0);

  const loadTipos = async () => {
    const res = await api.get("/Ingreso");
    console.log(res, "res");
    
    setTipos(res.data?.data ?? []);
  };

  const fetchData = async () => {
    const params = new URLSearchParams();
    if (from) params.set("fechaInicio", from);
    if (to) params.set("fechaFin", to);
    if (tipoId) params.set("tipoId", tipoId);
    const res = await api.get(`/Ingreso/detalle?${params.toString()}`);
    const list = res.data?.data?.[0] ?? [];   
    
    setRows(list);
   
    setTotal(list.reduce((acc, x) => acc + Number(x.importe ?? 0), 0));
    
  };

  useEffect(() => { loadTipos(); fetchData(); }, []);

  const onSubmit = (e) => { e.preventDefault(); fetchData(); };
  const onClear = () => { setFrom(""); setTo(""); setTipoId(""); fetchData(); };

  return (
    <>
      <Link to="/" className="btn btn-secondary mb-3">Volver</Link>
      <h2 className="mb-3">Detalle de ingresos</h2>

      <form className="row g-2 align-items-end" onSubmit={onSubmit}>
        <div className="col-sm-3">
          <label className="form-label">Desde</label>
          <input type="date" className="form-control" value={from} onChange={e=>setFrom(e.target.value)} />
        </div>
        <div className="col-sm-3">
          <label className="form-label">Hasta</label>
          <input type="date" className="form-control" value={to} onChange={e=>setTo(e.target.value)} />
        </div>
        <div className="col-sm-3">
          <label className="form-label">Tipo</label>
          <select className="form-control" value={tipoId} onChange={e=>setTipoId(e.target.value)}>
            <option value="">Todos</option>
            {tipos.map(t => <option key={t.id} value={t.id}>{t.nombreIngreso}</option>)}
          </select>
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
          <thead>
            <tr>
              <th>Fecha</th><th>Mes</th><th>Tipo</th>
              <th>Descripción</th>
              <th className="text-end">Importe</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.fecha ? soloFecha(r.fecha) : "-"}</td>
                <td>{r.mes}</td>
                <td>{r.tipo}</td>
                <td>{r.descripcion}</td>
                <td className="text-end">{Number(r.importe).toFixed(2)}</td>
              </tr>
            ))}
            {rows.length===0 && (
              <tr><td colSpan={4} className="text-muted">Sin resultados</td></tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={4} className="text-end">Total</th>
              <th className="text-end">{total.toFixed(2)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default IncomeDetails;
