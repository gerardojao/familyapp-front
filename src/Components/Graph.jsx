// src/Components/Graph.jsx
import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  Colors,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Colors, Tooltip, Legend, ChartDataLabels);

/**
 * Props:
 * - data:        optional, array de objetos (ej: [{cuenta_Ingreso,total}, ...])
 * - labelKey:    clave para las etiquetas si usas `data` (default "cuenta_Ingreso")
 * - valueKey:    clave para los valores si usas `data` (default "total")
 * - dataInfo:    optional, objeto Chart.js { labels, datasets } (si ya lo traes listo)
 * - options:     opciones Chart.js extra (se fusionan con las nuestras)
 * - className:   clases extra para el wrapper
 * - heightClass: clase Tailwind para controlar la altura del canvas
 * - title:       título opcional
 */
export default function Graph({
  data,
  labelKey = "cuenta_Ingreso",
  valueKey = "total",
  dataInfo,
  options = {},
  className = "",
  heightClass = "h-[28rem] md:h-[32rem]",
  title = "",
}) {
  const chartData = useMemo(() => {
    if (dataInfo) return dataInfo;
    const labels = Array.isArray(data) ? data.map((i) => i?.[labelKey]) : [];
    const values = Array.isArray(data) ? data.map((i) => i?.[valueKey]) : [];
    return { labels, datasets: [{ data: values }] };
  }, [data, dataInfo, labelKey, valueKey]);

  const mergedOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false, // permite usar heightClass
      plugins: {
        legend: { position: "left" },
        tooltip: { enabled: true },
        datalabels: {
          formatter: (value, ctx) => {
            const nums = ctx?.chart?.data?.datasets?.[0]?.data ?? [];
            const total = nums.reduce((a, n) => a + (+n || 0), 0) || 1;
            return `${((value / total) * 100).toFixed(1)}%`;
          },
          anchor: "end",
          align: "end",
          clamp: true,
        },
        ...(options.plugins || {}),
      },
      ...options,
    }),
    [options]
  );

  return (
    <section className={`card p-4 ${className}`}>
      {title ? (
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      ) : null}
      <div className={`${heightClass} p-2`}>
        <Doughnut data={chartData} options={mergedOptions} />
      </div>
    </section>
  );
}
