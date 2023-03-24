import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Home = ({ dataToEdit, setDataToEdit }) => {
  const navigate = useNavigate();
  const registroIngreso = () => {
    setDataToEdit(true);
    navigate("/register");
  };
  const registroEgreso = () => {
    setDataToEdit(false);
    navigate("/register");
  };
  const verEgreso = () => {
    navigate("/showExpenses");
  };

  return (
    <div>
      <h1>Family App</h1>
      <div className="card">
        <button className="btn btn-success" onClick={() => registroIngreso()}>
          Registrar Ingresos
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate("/showIncomes")}
        >
          Ver Ingresos
        </button>
        <button className="btn btn-danger" onClick={() => registroEgreso()}>
          Registrar Egreso
        </button>
        <button className="btn btn-danger" onClick={() => verEgreso()}>
          Ver Egresos
        </button>
        <button
          className="btn btn-danger"
          onClick={() => navigate("/statement")}
        >
          Generar Relación de Ingresos y Egresos
        </button>
      </div>
    </div>
  );
};

export default Home;
