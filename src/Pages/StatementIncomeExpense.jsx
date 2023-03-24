import { useEffect, useState, useId } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "../Components/Loader";
import api from "../Components/api";
import { Link } from "react-router-dom";

const StatementIncomeExpense = () => {
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

  return (
    <>
      <h2>Ingresos</h2>
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
                <th>TIPO DE INGRESO</th>
                <th>TOTAL INGRESO</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ing) => (
                <tr key={useId}>
                  <td>{ing.cuenta_Ingreso}</td>
                  <td>{ing.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default StatementIncomeExpense;
