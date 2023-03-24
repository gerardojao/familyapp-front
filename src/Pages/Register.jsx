import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

import api from "../Components/api";

const Register = ({
  dataToEdit,
  setDataToEdit,
  income,
  setIncome,
  expense,
  setExpense,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [inc, setInc] = useState([]);
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

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setIncome((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => {
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
          .post("/FichaEgreso/Create", expense)
          .then((res) => console.log(data.concat(res.data)));

        alert("Registro exitoso");
        navigate("/");
        setExpense(expense);
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
  const getOutcomes = async () => {
    await api.get("/Egreso").then((res) => setOut(data.concat(res.data.data)));
  };

  useEffect(() => {
    getIncomes();
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
  console.log(income);
  console.log(out);
  console.log(inc);
  return (
    <>
      {dataToEdit ? (
        <form
          className="containerPrincipal"
          onClick={getIncomes}
          onSubmit={RegistrarIngreso}
        >
          <Link to="/" className="btn btn-primary" onClick={changeDataToEdit}>
            Inicio
          </Link>
          <br />
          <br />

          <div className="containerLogin">
            <h2>Registro de Ingreso</h2>
            <br />
            <div className="form-group">
              <select
                style={{ display: "none" }}
                name="NombreIngreso"
                className="form-control"
                value={income.NombreIngreso}
                onChange={handleChange2}
              >
                {inc.map((item) => (
                  <option key={item.id}>{item.id}</option>
                ))}
                <option value={inc.id}>{inc.id}</option>
              </select>

              <label>Tipo de Ingreso: </label>

              <select
                name="NombreIngreso"
                className="form-control"
                value={income.NombreIngreso}
                onChange={handleChange2}
              >
                <option value={"default"}>Selecciona el tipo de Ingreso</option>
                {inc.map((item) => (
                  <option key={item.id}>{item.id}</option>
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
                onChange={handleChange2}
              />
              <br />
              <label>Fecha: </label>
              <br />
              <input
                type="date"
                className="form-control"
                name="Fecha"
                value={income.Fecha}
                onChange={handleChange2}
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
                onChange={handleChange2}
              >
                <option value={"default"}>
                  Selecciona el mes de la factura
                </option>
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
                value={income.Importe}
                onChange={handleChange2}
              />
              <br />
              <button className="btn btn-success">Registrar Ingreso</button>
            </div>
          </div>
        </form>
      ) : (
        <form
          className="containerPrincipal"
          onClick={getOutcomes}
          onSubmit={RegistrarEgreso}
        >
          <Link to="/" className="btn btn-primary" onClick={changeDataToEdit}>
            Volver
          </Link>
          <br />
          <br />

          <div className="containerLogin">
            <h2>Registro de Gasto</h2>
            <br />
            <div className="form-group">
              <select
                // style={{ display: "none" }}
                name="NombreIngreso"
                className="form-control"
                value={expense.NombreEgreso}
                onChange={handleChange3}
              >
                {out.map((item) => (
                  <option key={item.id}>{item.id}</option>
                ))}
              </select>

              <label>Tipo de Egreso: </label>

              <select
                name="NombreIngreso"
                className="form-control"
                value={expense.NombreEgreso}
                onChange={handleChange3}
              >
                <option value={"default"}>Selecciona el tipo de Egreso</option>
                {out.map((item) => (
                  <option key={item.id}>{item.nombre}</option>
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
                onChange={handleChange3}
              />
              <br />
              <label>Fecha: </label>
              <br />
              <input
                type="date"
                className="form-control"
                name="Fecha"
                value={expense.Fecha}
                onChange={handleChange3}
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
                onChange={handleChange3}
              >
                <option value={"default"}>
                  Selecciona el mes de la factura
                </option>
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
                onChange={handleChange3}
              />
              <br />
              <button className="btn btn-success">Registrar Egreso</button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Register;
