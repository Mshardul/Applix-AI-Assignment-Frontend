import React, { useState, useEffect } from "react";
import { Line, Bar, Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

// Register Chart.js components
Chart.register(...registerables);

const TemperatureChart = ({ data }) => {
  const [chartType, setChartType] = useState("line");

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
    <>
      {/* Move Dropdown OUTSIDE of fixed-height box */}
      <FormControl sx={{ marginBottom: 2, minWidth: 150 }}>
        <InputLabel>Chart Type</InputLabel>
        <Select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          label="Chart Type"
        >
          <MenuItem value="line">Line Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
          <MenuItem value="radar">Radar Chart</MenuItem>
        </Select>
      </FormControl>

      {/* Fixed-height container ONLY for chart */}
      <Box sx={{ height: 450, overflow: "hidden" }}>
        {chartType === "line" && <Line data={data} options={options} />}
        {chartType === "bar" && <Bar data={data} options={options} />}
        {chartType === "radar" && <Radar data={data} options={options} />}
      </Box>
    </>
  );
};

export default TemperatureChart;