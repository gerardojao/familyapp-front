import React from "react";

const Graph = ({ dataInfo, opciones }) => {
  dataInfo = {
    labels: data.map((item) => item.cuenta_Ingreso),
    datasets: [
      {
        data: data.map((item) => item.total),
      },
    ],
  };

  opciones = {
    responsive: true,

    plugins: {
      color: {
        enabled: false,
      },
      legend: { position: "left" },
      datalabels: {
        formatter: (value, context) => {
          console.log(context.chart.config.data.datasets[0].data);
          const datapoints = context.chart.config.data.datasets[0].data;
          function totalSum(total, datapoint) {
            return total + datapoint;
          }
          const totalValue = datapoints.reduce(totalSum, 0);
          const percentageValue = ((value / totalValue) * 100).toFixed(1);
          return `${percentageValue}%`;
        },
      },
    },
  };
};

export default Graph;
