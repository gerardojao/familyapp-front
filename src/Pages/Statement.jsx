import React, { useState, useEffect } from "react";
import api from "../Components/api";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";

function Statement() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIncomes = async () => {
    const res = await api.get("/Ingreso/totales");
    setIncomes(res.data.data[0]);
    setLoading(false);
  };
  const getExpenses = async () => {
    const res = await api.get("/Egreso/totales");
    setExpenses(res.data.data[0]);
    setLoading(false);
  };

  // Function to calculate total incomes
  const calculateTotalIncomes = () => {
    let total = incomes
      .map((x) => x.total)
      .reduce((total, actual) => total + actual, 0);
    return total;
  };
  useEffect(() => {
    getExpenses();
    getIncomes();
  }, []);

  //Function to calculate total expenses
  const calculateTotalExpenses = () => {
    let total = expenses
      .map((x) => x.total)
      .reduce((total, actual) => total + actual, 0);
    return total;
  };

  // Calculate total balance
  const totalBalance = calculateTotalIncomes() - calculateTotalExpenses();
  console.log(incomes.map((x) => x.total));
  console.log(expenses);
  console.log(totalBalance);
  return (
    <div>
      <Link to="/" className="btn btn-primary">
        Volver
      </Link>
      <br />
      <br />
      <h2>Relación de Ingresos y Gastos</h2>
      <br />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            {/* <h3>INGRESOS</h3> */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  {/* <th>DESCRIPCIÓN DEL INGRESO</th>
                  <th>TOTAL INGRESO</th> */}
                  <th colSpan={2}>
                    <h3>INGRESOS</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((inc, i) => (
                  <tr key={i}>
                    <td>{inc.cuenta_Ingreso}</td>
                    <td>{inc.total}</td>
                    {/* <td></td> */}
                  </tr>
                ))}
              </tbody>
            </table>

            <p>
              <b>Total Ingresos: {calculateTotalIncomes().toFixed(2)}</b>
            </p>
          </div>
          <br />
          <div>
            {/* <h3>GASTOS</h3> */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  {/* <th>DESCRIPCIÓN DEL EGRESO</th>
                  <th>TOTAL EGRESO</th> */}
                  <th colSpan={2}>
                    <h3>GASTOS</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, i) => (
                  <tr key={i}>
                    <td>{exp.cuenta_Egreso}</td>
                    <td>{exp.total}</td>
                    {/* <td></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <b>Total Gastos: {calculateTotalExpenses().toFixed(2)}</b>
            </p>
          </div>
          <br />
          {totalBalance > 0 ? (
            <h3>
              <b> Ganancia: ${totalBalance.toFixed(2)} </b>
            </h3>
          ) : (
            <h3>
              <b>Perdida: ${totalBalance.toFixed(2)}</b>
            </h3>
          )}
        </>
      )}
    </div>
  );
}

export default Statement;
