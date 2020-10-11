import React from "react";
import BoroChart from "../BoroChart";
import { Bar, Line } from "react-chartjs-2";

function ResultList(props) {
  var colorArray = [
    "#f5cac3",
    "#ffcb77",
    "#c5baaf",
    "#cc8b86",
    "#84a59d",
    "#f7ede2",
  ];

  const BarChart = ({ type }) => {
    const obj = {};

    let options = {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Number of Arrestees in Each Age Range'
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          }
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
      const key = arrest[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
    // const eighteenUnder = entries.pop();
    //  entries.unshift([[eighteenUnder][0]]);
     return (
        <Bar
          data={{
            labels: entries.map((x) => x[0]),
            datasets: [
              {
                data: entries.map((x) => x[1]),
                backgroundColor: colorArray, 
              },
            ],
          }}
          options={options} 
        />
      );

  };



  const LineChart = ({ type }) => {
    const obj = {};

    let options = {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Number of Arrests Over Time'
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            }
          }
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
      const key = arrest[type].substring(0, 10);
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
     return (
        <Line
          data={{
            labels: entries.map((x) => x[0]),
            datasets: [
              {
                data: entries.map((x) => x[1]),
                backgroundColor: "#a4c3b2", 
              },
            ],
          }} 
          options={options} 
        />
      );

  };


  return (
    <div className="container-fluid mb-2">
      <div className="row">
        <div className="col-md-6 mt-2" style={{paddingLeft: "2px", paddingRight: "2px"}}>
        <div className="card">
          <BoroChart results={props.results} />{" "}
          </div>
        </div>{" "}
        <div className="col-md-6 mt-2" style={{paddingLeft: "2px", paddingRight: "2px"}}>
        <div className="card">
          <BarChart type="age_group" />
          </div>
        </div>{" "}
      </div>{" "}
      <div className="row mt-2">
      <div className="col-md-12" style={{paddingLeft: "2px", paddingRight: "2px"}}>
      <div className="card" style={{paddingBottom: "2px"}}>
        <LineChart type="arrest_date"/> 
      </div>
      </div>
      </div>
    </div>
  );
}

export default ResultList;
