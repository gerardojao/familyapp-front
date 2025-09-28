// src/Components/Layout.jsx
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Family App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="nav" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto gap-2">
              <li className="nav-item"><Link className={`nav-link ${pathname==="/statement"?"active":""}`} to="/statement">Relación</Link></li>
              <li className="nav-item"><Link className={`nav-link ${pathname==="/showIncomes"?"active":""}`} to="/showIncomes">Ingresos</Link></li>
              <li className="nav-item"><Link className={`nav-link ${pathname==="/showExpenses"?"active":""}`} to="/showExpenses">Gastos</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="container py-4">{children}</main>
    </div>
  );
}
