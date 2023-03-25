import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader";
import api from "../Components/api";
import {
  Chart as ChartJS,
  Colors,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "../css/show.css";

ChartJS.register(ArcElement, Colors, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

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
      },
    ],
  };

  const opciones = {
    responsive: true,

    plugins: {
      // tooltip: {
      //   enabled: false,
      // },
      color: {
        enabled: false,
      },
      legend: { position: "left" },
      datalabels: {
        formatter: (value, context) => {
          console.log(context.chart.config.data.datasets[0].data);
          const datapoints = context.chart.config.data.datasets[0].data;
          function totalSum(total, datapoint) {
            return total + datapoint;
          }
          const totalValue = datapoints.reduce(totalSum, 0);
          const percentageValue = ((value / totalValue) * 100).toFixed(1);
          return `${percentageValue}%`;
        },
      },
    },
  };
  console.log(data[0]);
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
        <div className="containerGraphic">
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
              <div className="graphic">
                <Doughnut data={dataInfo} options={opciones} />
              </div>
              <br />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ShowIncomes;
