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

const ShowIncomes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGraph, setshowGraph] = useState(false);

  const peticionGet = async () => {
    const res = await api.get("/Ingreso/totales");
    setData(res.data.data[0]);
    setLoading(false);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const dataInfo = {
    labels: data.map((item) => item.cuenta_Ingreso),
    datasets: [
      {
        data: data.map((item) => item.total),
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

  return (
    <>
      <Link to="/" className="btn btn-primary">
        Volver
      </Link>
      <br />
      <br />
      <h2>Ingresos</h2>

      <br />
      {loading ? (
        <Loader />
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>TIPO DE INGRESO</th>
                <th>TOTAL INGRESO</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ing, i) => (
                <tr key={i}>
                  <td>{ing.cuenta_Ingreso}</td>
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

export default ShowIncomes;
