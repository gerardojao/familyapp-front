// src/Pages/Home.jsx
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="row g-3">
      <div className="col-12">
        <h1 className="display-6 mb-3">Panel</h1>
      </div>

      <div className="col-12 col-md-6">
        <div className="card h-100 shadow-sm">
          <div className="card-body d-grid gap-2">
            <h5 className="card-title">Ingresos</h5>
            <button className="btn btn-success" onClick={()=>navigate("/register-income")}>Registrar ingreso</button>
            <button className="btn btn-outline-success" onClick={()=>navigate("/showIncomes")}>Ver ingresos</button>
            <button className="btn btn-outline-success" onClick={()=>navigate("/ingresos-detalle")}>Detalle del ingreso</button>
            <button className="btn btn-outline-success" onClick={()=>navigate("/ingresosPorFecha")}>Ingresos por fecha</button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="card h-100 shadow-sm">
          <div className="card-body d-grid gap-2">
            <h5 className="card-title">Gastos</h5>
            <button className="btn btn-danger" onClick={()=>navigate("/register-expense")}>Registrar gasto</button>
            <button className="btn btn-outline-danger" onClick={()=>navigate("/showExpenses")}>Ver gastos</button>
            <button className="btn btn-outline-danger" onClick={()=>navigate("/egresos-detalle")}>Detalle del gasto</button>
             <button className="btn btn-outline-danger" onClick={()=>navigate("/egresosPorFecha")}>Gastos por fecha</button>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <h5 className="m-0">Relación de ingresos y gastos</h5>
            <button className="btn btn-primary" onClick={()=>navigate("/statement")}>Generar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
