import React from "react";
import "./Loader.css";

export default function Loader({ label = "Cargando..." }) {
  return (
    <div className="fa-loader-wrap" role="status" aria-live="polite">
      <div className="lds-ring" aria-hidden="true">
        <div></div>
        <div></div>
      </div>
      <span className="fa-loader-text">{label}</span>
    </div>
  );
}
