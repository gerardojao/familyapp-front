// src/Components/DateRange.jsx
export default function DateRange({ from, to, onChangeFrom, onChangeTo, onClear, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="dr-from" className="label">Desde</label>
          <input
            id="dr-from"
            type="date"
            className="input"
            value={from}
            onChange={(e) => onChangeFrom?.(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dr-to" className="label">Hasta</label>
          <input
            id="dr-to"
            type="date"
            className="input"
            value={to}
            onChange={(e) => onChangeTo?.(e.target.value)}
          />
        </div>

        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="btn-emerald flex-1 md:flex-none">Buscar</button>
          <button type="button" className="btn-ghost flex-1 md:flex-none" onClick={onClear}>Limpiar</button>
        </div>
      </div>
    </form>
  );
}
