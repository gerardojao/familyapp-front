import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

import api from "../Components/api";

const RegisterIncome = ({ income, setIncome }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [inc, setInc] = useState([]);
  const Months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const RegistrarIngreso = async (e) => {
    e.preventDefault();
    console.log("Registrar");
    try {
      if (
        income.Foto === "" ||
        income.TipoIngreso == "" ||
        income.Mes === "" ||
        income.Importe === ""
      ) {
        console.error("Todos los campos son requeridos");
      } else {
        delete income.Id;
        await api
          .post("/FichaIngreso/Create", income)
          .then((res) => console.log(data.concat(res.data)));

        alert("Registro exitoso");
        navigate("/");
        setIncome(income);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeDataToEdit = () => {
    setDataToEdit(false);
    setIncome(income);
    setExpense(expense);
  };

  const getIncomes = async () => {
    await api.get("/Ingreso").then((res) => setInc(data.concat(res.data.data)));
  };

  useEffect(() => {
    getIncomes();
  }, []);

  const convertirImagen = (file) => {
    Array.from(file).forEach((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        var auxArr = [];
        var base64 = reader.result;
        auxArr = base64.split(",");
      };
    });
  };
  console.log(income);
  return (
    <form
      className="containerPrincipal"
      onClick={getIncomes}
      onSubmit={RegistrarIngreso}
    >
      <Link to="/" className="btn btn-primary">
        Inicio
      </Link>
      <br />
      <br />

      <div className="containerLogin">
        <h2>Registro de Ingreso</h2>
        <br />
        <div className="form-group">
          {/* <select
            // style={{ display: "none" }}
            name="NombreIngreso"
            className="form-control"
            value={income.NombreIngreso}
            onChange={handleChange}
          >
            <option value={"default"}>Selecciona el tipo de Ingreso</option>
            {inc.map((item, i) => (
              <option key={i}>{item.id}</option>
            ))}
          </select> */}

          <label>Tipo de Ingreso: </label>

          <select
            name="NombreIngreso"
            className="form-control"
            // value={income.NombreIngreso}
            onChange={handleChange}
          >
            <option value={"default"}>Selecciona el tipo de Ingreso</option>
            {inc.map((item, i) => (
              <option value={item.id} key={i}>
                {item.nombreIngreso}
              </option>
            ))}
          </select>

          <br />
          <label>Foto: </label>
          <br />
          <input
            required
            onChangeCapture={(e) => convertirImagen(e.target.files)}
            type="file"
            className="form-control"
            name="Foto"
            value={income.Foto}
            onChange={handleChange}
          />
          <br />
          <label>Fecha: </label>
          <br />
          <input
            type="date"
            className="form-control"
            name="Fecha"
            value={income.Fecha}
            onChange={handleChange}
          />
          <br />
          <label>Mes: </label>
          <br />
          <select
            required
            type="text"
            className="form-control"
            name="Mes"
            value={income.Mes}
            onChange={handleChange}
          >
            <option value={"default"}>Selecciona el mes de la factura</option>
            {Months.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>

          <br />
          <label>Importe: </label>
          <br />
          <input
            placeholder="0.00"
            required
            type="number"
            step="0.01"
            className="form-control"
            name="Importe"
            value={income.Importe}
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-success">Registrar Ingreso</button>
        </div>
      </div>
    </form>
  );
};

export default RegisterIncome;
