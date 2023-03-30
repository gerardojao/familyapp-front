import React from "react";

const Dates = () => {
  return (
    <form onSubmit={() => peticionGet()}>
      <label>
        Desde:
        <input
          type="date"
          name="fecha"
          value={fechaInicial}
          onChange={(event) => setFechaInicial(event.target.value)}
        />
      </label>
      <label>
        Hasta:
        <input
          type="date"
          name="fecha"
          value={fechaFinal}
          onChange={(event) => setFechaFinal(event.target.value)}
        />
      </label>
      <br />
      <br />
      <input type="submit" value="Enviar" />
      <br />
      <br />
    </form>
  );
};

export default Dates;
