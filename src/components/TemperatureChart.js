import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Box, Typography } from "@mui/material";

// Register Chart.js components
Chart.register(...registerables);

const TemperatureChart = ({ data }) => {
  useEffect(() => {
    console.log("Chart Data Received:", data);
  }, [data]);

  if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
    return <Typography>Chart Data is Empty or Incorrect</Typography>;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: true,
    elements: {
      line: { tension: 0.4 },
      point: { radius: 4, hoverRadius: 6 }
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      }
    },
    scales: {
      x: { 
        display: true, 
        title: { display: true, text: "Date" },
        ticks: { maxRotation: 30, minRotation: 30 },
      },
      y: { 
        display: true, 
        title: { display: true, text: "Temperature (°C)" },
        beginAtZero: false,
      },
    },
  };

  return (
    <Box sx={{ height: 400, maxHeight: 450, overflow: "hidden" }}> 
      <Line data={data} options={options} />
    </Box>
  );
};

export default TemperatureChart;