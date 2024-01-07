import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const MyChartComponent = ({ intakeData, interval }) => {
  // Grouping intake data by specified interval
  const groupedData = intakeData.reduce((acc, intake) => {
    let timestamp;
    if (intake.timeStamp instanceof Date) {
      timestamp = intake.timeStamp;
    } else if (typeof intake.timeStamp === 'number') {
      timestamp = new Date(intake.timeStamp); // Convert Unix timestamp to Date object
    } else {
      // Handle other timestamp formats if necessary
    }

    const hour = timestamp.getHours();
    const intervalValue = Math.floor(hour / interval) * interval; // Calculate interval start hour
    const key = `${timestamp.toDateString()} - ${intervalValue}:00 - ${intervalValue + interval}:00`;

    if (!acc[key]) {
      acc[key] = 0;
    }

    acc[key] += parseInt(intake.dailyIntake);
    return acc;
  }, {});

  const labels = Object.keys(groupedData);
  const intakeValues = Object.values(groupedData);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Intake vs Timestamp",
        backgroundColor: "rgb(232, 108, 26)",
        borderColor: "rgba(150, 92, 53)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: intakeValues,
      },
    ],
  };

  return (
    <div>
      <h2>Intake vs Timestamp Chart</h2>
      <div>
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Intake in Litres",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Timestamp",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MyChartComponent;
