// src/Components/DateRange.jsx
export default function DateRange({ from, to, onChangeFrom, onChangeTo, onClear, onSubmit }) {
  return (
    <form className="row gy-2 gx-3 align-items-end" onSubmit={(e)=>{e.preventDefault(); onSubmit?.();}}>
      <div className="col-12 col-sm-4">
        <label className="form-label">Desde</label>
        <input type="date" className="form-control" value={from} onChange={(e)=>onChangeFrom(e.target.value)} />
      </div>
      <div className="col-12 col-sm-4">
        <label className="form-label">Hasta</label>
        <input type="date" className="form-control" value={to} onChange={(e)=>onChangeTo(e.target.value)} />
      </div>
      <div className="col-12 col-sm-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary flex-grow-1">Buscar</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onClear}>Limpiar</button>
      </div>
    </form>
  );
}
