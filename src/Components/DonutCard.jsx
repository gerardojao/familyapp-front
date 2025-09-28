// src/Components/DonutCard.jsx
import { Doughnut } from "react-chartjs-2";

export default function DonutCard({ title, data, options }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header fw-semibold">{title}</div>
      <div className="card-body">
        <div style={{maxWidth: 520, margin: "0 auto"}}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
