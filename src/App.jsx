// // src/App.jsx
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useState } from "react";
// import Layout from "./Components/Layout";
// import Home from "./Pages/Home";
// import Register from "./Pages/Register";
// import RegisterIncome from "./Pages/RegisterIncome";
// import ShowIncomes from "./Pages/ShowIncomes";
// import ShowExpenses from "./Pages/ShowExpenses";
// import Statement from "./Pages/Statement";
// import IncomeByMonth from "./Pages/IncomesByMont";
// import ExpensesByMonths from "./Pages/ExpenseByMonths";
// import IncomeDetails from "./Pages/IncomeDetails.jsx";
// import ExpenseDetails from "./Pages/ExpenseDetails.jsx";


// function App() {
//   const [income, setIncome] = useState({
//     Id: "",
//     Foto: "",
//     Fecha: "",
//     Mes: "",
//     Importe: "",
//     NombreIngreso: "",
//   });

//   const [expense, setExpense] = useState({
//     Foto: "",
//     Fecha: "",
//     Mes: "",
//     Importe: "",
//     NombreEgreso: "",
//   });

//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register-income" element={<RegisterIncome income={income} setIncome={setIncome} />} />
//           <Route path="/register-expense" element={<Register expense={expense} setExpense={setExpense} />} />
//           <Route path="/showIncomes" element={<ShowIncomes />} />
//           <Route path="/showExpenses" element={<ShowExpenses />} />
//           <Route path="/statement" element={<Statement />} />
//           <Route path="/ingresosPorFecha" element={<IncomeByMonth />} />
//           <Route path="/egresosPorFecha" element={<ExpensesByMonths />} />
//           <Route path="/ingresos-detalle" element={<IncomeDetails />} />
//           <Route path="/egresos-detalle" element={<ExpenseDetails />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }
// export default App;

// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import RegisterIncome from "./Pages/RegisterIncome";
import ShowIncomes from "./Pages/ShowIncomes";
import ShowExpenses from "./Pages/ShowExpenses";
import Statement from "./Pages/Statement";
import IncomeByMonth from "./Pages/IncomesByMont";
import ExpensesByMonths from "./Pages/ExpenseByMonths";
import IncomeDetails from "./Pages/IncomeDetails.jsx";
import ExpenseDetails from "./Pages/ExpenseDetails.jsx";
import Login from "./Pages/Login.jsx";

import AuthProvider from "./Components/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import "./App.css";

function App() {
  const [income, setIncome] = useState({
    Id: "", Foto: "", Fecha: "", Mes: "", Importe: "", NombreIngreso: "", IngresoId: "", Descripcion: ""
  });
  const [expense, setExpense] = useState({
    Foto: "", Fecha: "", Mes: "", Importe: "", NombreEgreso: "", Descripcion: ""
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />

            {/* protegidas (ajusta según tu necesidad) */}
            <Route
              path="/register-income"
              element={
                <ProtectedRoute>
                  <RegisterIncome income={income} setIncome={setIncome} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register-expense"
              element={
                <ProtectedRoute>
                  <Register expense={expense} setExpense={setExpense} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/showIncomes"
              element={
                <ProtectedRoute>
                  <ShowIncomes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/showExpenses"
              element={
                <ProtectedRoute>
                  <ShowExpenses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/statement"
              element={
                <ProtectedRoute>
                  <Statement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ingresosPorFecha"
              element={
                <ProtectedRoute>
                  <IncomeByMonth />
                </ProtectedRoute>
              }
            />
            <Route
              path="/egresosPorFecha"
              element={
                <ProtectedRoute>
                  <ExpensesByMonths />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ingresos-detalle"
              element={
                <ProtectedRoute>
                  <IncomeDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/egresos-detalle"
              element={
                <ProtectedRoute>
                  <ExpenseDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
