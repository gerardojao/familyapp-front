import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import "./App.css";
import Register from "./Pages/Register.jsx";
import ShowIncomes from "./Pages/ShowIncomes";
import ShowExpenses from "./Pages/ShowExpenses";
import Statement from "./Pages/Statement.jsx";

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
  const [expense, setExpense] = useState({
    Id: "",
    Foto: "",
    TipoEgreso: "",
    Fecha: "",
    Mes: "",
    Importe: "",
    NombreEgreso: "",
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
              expense={expense}
              setExpense={setExpense}
            />
          }
        />
        <Route
          path="/showIncomes"
          element={<ShowIncomes income={income} setIncome={setIncome} />}
        />
        <Route
          path="/showExpenses"
          element={<ShowExpenses expense={expense} setExpense={setExpense} />}
        />
        <Route path="/statement" element={<Statement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
