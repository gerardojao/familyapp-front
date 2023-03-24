import React, { useState, useEffect, useId } from "react";
import Loader from "../Components/Loader";
import api from "../Components/api";
import {
  Chart as ChartJS,
  Colors,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Colors, Tooltip, Legend);

const ShowExpenses = () => {
  console.log("Hola");
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGraph, setshowGraph] = useState(false);

  const peticionGet = async () => {
    const res = await api.get("/Egreso/totales");
    setData2(res.data.data[0]);
    setLoading(false);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const dataInfo = {
    labels: data2.map((item) => item.cuenta_Egreso),
    datasets: [
      {
        data: data2.map((item) => item.total),
        //backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  };

  const opciones = {
    responsive: true,
    plugins: {
      color: {
        enabled: false,
      },
    },
  };
  console.log(data2);
  return (
    <>
      <h2>Gastos</h2>
      <br />
      <br />
      <Link to="/" className="btn btn-primary">
        Volver
      </Link>
      <br />
      <br />
      {loading ? (
        <Loader />
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>TIPO DE EGRESO</th>
                <th>TOTAL EGRESO</th>
              </tr>
            </thead>
            <tbody>
              {data2.map((ing) => (
                <tr key={useId}>
                  <td>{ing.cuenta_Egreso}</td>
                  <td>{ing.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-success"
            onClick={() => setshowGraph(!showGraph)}
          >
            {showGraph ? "Ocultar Gráfico" : "Generar Gráfico"}
          </button>
          <br />
          <br />
          {showGraph && (
            <>
              <div>
                <Doughnut data={dataInfo} options={opciones} />
              </div>
              <br />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ShowExpenses;
