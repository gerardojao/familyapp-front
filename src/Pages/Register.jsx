import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

import api from "../Components/api";

const Register = ({ dataToEdit, setDataToEdit, user, setUser }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [user2, setUser2] = useState({
    Id: "",
    FirstName: "",
    LastName: "",
    UserName: "",
    Email: "",
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log(user);
  };

  const RegistrarIngreso = async (e) => {
    e.preventDefault();
    console.log("Registrar");
    try {
      if (
        user.LastName === "" ||
        user.Name === "" ||
        user.Email === "" ||
        user.UserName === ""
      ) {
        console.error("Todos los campos son requeridos");
      } else {
        delete user.Id;
        await api
          .post("/Users/Create", user)
          .then((res) => console.log(data.concat(res.data)));

        alert("Registro exitoso");
        navigate("/");
        setUser(user2);
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
        user.LastName === "" ||
        user.Name === "" ||
        user.Email === "" ||
        user.UserName === ""
      ) {
        console.error("Todos los campos son requeridos");
      } else {
        delete user.Id;
        await api
          .post("/Users/Create", user)
          .then((res) => console.log(data.concat(res.data)));

        alert("Registro exitoso");
        navigate("/");
        setUser(user2);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeDataToEdit = () => {
    setDataToEdit(false);
    setUser(user2);
  };

  //   const peticionPut = async (e) => {
  //     e.preventDefault();
  //     setDataToEdit(false);
  //     // navigate("/home")

  //     // let dataAux = data
  //     await api
  //       .put("/Users?Id=" + user.UserId, user)
  //       .then((res) => {
  //         data.map((elem) => {
  //           console.log(elem.UserId, user.UserId);
  //           if (elem.UserId === user.UserId) {
  //             elem.Id = res.data.Id;
  //             elem.Name = res.data.Name;
  //             elem.LastName = res.data.LastName;
  //             elem.Email = res.data.Email;
  //             elem.UserName = res.data.UserName;
  //             elem.UserId = res.data.UserId;
  //           }
  //         });
  //         navigate("/");
  //         setUser(user2);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  return (
    <>
      {dataToEdit ? (
        <form className="containerPrincipal" onSubmit={RegistrarIngreso}>
          <Link to="/" className="btn btn-primary" onClick={changeDataToEdit}>
            Inicio
          </Link>
          <br />
          <br />

          <div className="containerLogin">
            <h2>Registro de Ingreso</h2>
            <div className="form-group">
              <label>Usuario: </label>
              <br />
              <input
                required
                type="text"
                className="form-control"
                name="UserName"
                value={user.UserName}
                onChange={handleChange2}
              />
              <br />

              <label>Correo: </label>
              <br />
              <input
                required
                type="email"
                className="form-control"
                name="Email"
                value={user.Email}
                onChange={handleChange2}
              />
              <br />

              <label>Nombre: </label>
              <br />
              <input
                required
                type="text"
                className="form-control"
                name="Name"
                value={user.Name}
                onChange={handleChange2}
              />
              <br />
              <label>Apellido: </label>
              <br />
              <input
                required
                type="text"
                className="form-control"
                name="LastName"
                value={user.LastName}
                onChange={handleChange2}
              />
              <br />
              <button className="btn btn-success">Registrar Ingreso</button>
            </div>
          </div>
        </form>
      ) : (
        <form className="containerPrincipal" onSubmit={RegistrarEgreso}>
          <Link to="/" className="btn btn-primary" onClick={changeDataToEdit}>
            Inicio
          </Link>
          <br />
          <br />
          <div className="containerLogin">
            <h2>Registrar Egreso</h2>
            <br />
            <div className="form-group">
              <label>Usuario: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="UserName"
                value={user && user.UserName}
                onChange={handleChange2}
              />
              <br />

              <label>Correo: </label>
              <br />
              <input
                type="email"
                className="form-control"
                name="Email"
                value={user && user.Email}
                onChange={handleChange2}
              />
              <br />

              <label>Nombre: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="Name"
                value={user && user.Name}
                onChange={handleChange2}
              />
              <br />
              <label>Apellido: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="LastName"
                value={user && user.LastName}
                onChange={handleChange2}
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
