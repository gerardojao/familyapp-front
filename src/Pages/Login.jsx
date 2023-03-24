import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

import Swal from "sweetalert2";

const Login = ({ dataToEdit, setDataToEdit }) => {
  //const url = "https://localhost:44300/api/Users"
  //const cookies = new Cookies()
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // const [form, setForm] = useState({
  //     email: "",
  //     password: ""
  // })
  const [email, setEmail] = useState("");

  // const handleChange = (e) => {
  //     const { name, value } = e.target
  //     setEmail(prevState => {
  //         return {
  //             ...prevState,
  //             [name]: value
  //         }
  //     })

  // }

  const iniciarSesion = async (e) => {
    e.preventDefault();
    // // await axios.get(`${url}/${form.username}/${form.password}`)
    // await axios.get(`${url}`)
    //     .then(res => res.data.data)
    //     .then(res => {
    //         if (res.length > 0) {
    //             let response = res[0].email

    //            const result = client.auth.signIn({
    //                 response
    //             })
    //             console.log(result);
    //             console.log(response);
    //             // alert(`Bienvenido ${response.firstName}`)
    //             // navigate('/welcome')
    //             //alert(`Código para inciar sesión enviado a ${response}`)
    //         }
    //         else console.log("Email format incorrect")

    //     })
    try {
      Toast.fire({
        icon: "success",
        title: "Email sent successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const registro = () => {
    setDataToEdit(true);
    navigate("/register");
  };
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <div className="containerPrincipal">
        <div className="containerLogin">
          <form onSubmit={iniciarSesion} className="form-group">
            <label>Email: </label>
            <br />
            <br />
            <input
              placeholder="youremail@site.com"
              type="text"
              className="form-control"
              name="email"
              // value={email}
              // onChange={handleChange}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* <label>Usuario: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    /> */}
            <br />
            {/* <button className="btn btn-primary" onClick={() => iniciarSesion()}>Iniciar Sesión</button><br /><br /> */}
            <button className="btn btn-primary">Enviar Código</button>
            <br />
            <br />
            <button className="btn btn-success" onClick={() => registro()}>
              Registrate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
