import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import "./App.css";

import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";

function App() {
  const [dataToEdit, setDataToEdit] = useState(null);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    LastName: "",
    email: "",
    username: "",
    password: "",
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
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
              user={user}
              setUser={setUser}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
