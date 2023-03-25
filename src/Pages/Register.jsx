import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

import api from "../Components/api";

const Register = ({ income, setIncome, expense, setExpense }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [out, setOut] = useState([]);
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
    setExpense((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const RegistrarEgreso = async (e) => {
    e.preventDefault();
    console.log("Registrar");
    try {
      if (
        expense.Foto === "" ||
        expense.TipoIngreso == "" ||
        expense.Mes === "" ||
        expense.Importe === ""
      ) {
        console.error("Todos los campos son requeridos");
      } else {
        await api
          .post("/FichaEgreso", expense)
          .then((res) => console.log(data.concat(res.data)));

        alert("Registro exitoso");
        navigate("/");
        setExpense(expense);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOutcomes = async () => {
    await api.get("/Egreso").then((res) => setOut(data.concat(res.data.data)));
  };

  useEffect(() => {
    getOutcomes();
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
  console.log(expense);
  return (
    <>
      <form
        className="containerPrincipal"
        onClick={getOutcomes}
        onSubmit={RegistrarEgreso}
      >
        <Link to="/" className="btn btn-primary">
          Volver
        </Link>
        <br />
        <br />

        <div className="containerLogin">
          <h2>Registro de Gasto</h2>
          <br />
          <div className="form-group">
            <label>Tipo de Egreso: </label>

            <select
              name="NombreEgreso"
              className="form-control"
              // value={expense.NombreEgreso}
              onChange={handleChange}
            >
              <option value={"default"}>Selecciona el tipo de Egreso</option>
              {out.map((item, i) => (
                <option value={item.id} key={item.id}>
                  {item.nombre}
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
              value={expense.Foto}
              onChange={handleChange}
            />
            <br />
            <label>Fecha: </label>
            <br />
            <input
              type="date"
              className="form-control"
              name="Fecha"
              value={expense.Fecha}
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
              value={expense.Mes}
              onChange={handleChange}
            >
              <option value={"default"}>Selecciona el mes de la factura</option>
              {Months.map((item) => (
                <option key={item.id}>{item}</option>
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
              value={expense.Importe}
              onChange={handleChange}
            />
            <br />
            <button className="btn btn-success">Registrar Egreso</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
