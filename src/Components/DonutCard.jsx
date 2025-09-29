// src/Components/DonutCard.jsx
import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

export default function DonutCard({
  title = "",
  data,
  options = {},
  className = "",
  heightClass = "h-[28rem] md:h-[32rem]", // ajusta la altura aquí si quieres
}) {
  const mergedOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      ...options,
    }),
    [options]
  );

  return (
    <section className={`card p-4 ${className}`}>
      {title ? (
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      ) : null}

      {/* El canvas ocupa el 100% del contenedor; la altura la controla heightClass */}
      <div className={`${heightClass} p-2`}>
        <Doughnut data={data} options={mergedOptions} />
      </div>
    </section>
  );
}
