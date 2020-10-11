import React from "react";
import { Bar } from "react-chartjs-2";

var colorArray = [
    "#f5cac3",
    "#ffcb77",
    "#c5baaf",
    "#cc8b86",
    "#84a59d",
    "#f7ede2",
];

const BarChart = (props) => {
  const mappings = {
    B: "Bronx",
    S: "Staten Island",
    K: "Brooklyn",
    M: "Manhattan",
    Q: "Queens",
  };
  const obj = {};

  let options = {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Number of Arrests in Each Borough'
   },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [{
        ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 1
        },
        stacked: true
    }]
    }
  };

  props.results.forEach((arrest) => {
    const key = arrest["arrest_boro"];
    if (key)
      if (obj[key]) {
        obj[key] += 1;
      } else {
        obj[key] = 1;
      }
  });

  return (
    <Bar
      data={{
        labels: Object.keys(obj).map((x) => mappings[x]),
        datasets: [
          {
            data: Object.values(obj),
            backgroundColor: colorArray,
          },
        ],
      }}
      options={options}
    />
  );
};

export default BarChart;
