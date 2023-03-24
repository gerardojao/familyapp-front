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
      <h2>Statement of Incomes and Expenses</h2>
      <br />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h3>Incomes</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>DESCRIPCIÓN DEL EGRESO</th>
                  <th>TOTAL EGRESO</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((inc, i) => (
                  <tr key={i}>
                    <td>{inc.cuenta_Ingreso}</td>
                    <td>{inc.total}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p>Total Ingresos: ${calculateTotalIncomes()}</p>
          </div>

          <div>
            <h3>Expenses</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>DESCRIPCIÓN DEL EGRESO</th>
                  <th>TOTAL EGRESO</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, i) => (
                  <tr key={i}>
                    <td>{exp.cuenta_Egreso}</td>
                    <td>{exp.total}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total Gastos: ${calculateTotalExpenses()}</p>
          </div>
          {totalBalance > 0 ? (
            <h3>Ganancia: ${totalBalance}</h3>
          ) : (
            <h3>Perdida: ${totalBalance}</h3>
          )}
        </>
      )}
    </div>
  );
}

export default Statement;
