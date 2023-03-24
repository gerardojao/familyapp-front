import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import "./App.css";
import Register from "./Pages/Register.jsx";
import ShowIncomes from "./Pages/ShowIncomes";

function App() {
  const [dataToEdit, setDataToEdit] = useState(null);
  const [income, setIncome] = useState({
    Id: "",
    Foto: "",
    Fecha: "",
    Mes: "",
    Importe: "",
    NombreIngreso: "",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
              income={income}
              setIncome={setIncome}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
              income={income}
              setIncome={setIncome}
            />
          }
        />
        <Route
          path="/showIncomes"
          element={
            <ShowIncomes
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
              income={income}
              setIncome={setIncome}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
