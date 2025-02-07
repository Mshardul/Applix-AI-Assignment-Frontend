import React, { useState, useEffect } from "react";
import { Container, Stack, Box, Typography, CircularProgress, Switch, FormControlLabel } from "@mui/material";
import Header from "./components/Header.js";
import UploadModal from "./components/UploadModal.js";
import GetDataModal from "./components/GetDataModal.js";
import TemperatureChart from "./components/TemperatureChart.js";
import DataTable from "./components/DataTable.js";
import axios from "axios";


const App = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [retrieveOpen, setRetrieveOpen] = useState(false);
  const [temperatureDataChart, setTemperatureDataChart] = useState({});
  const [temperatureDataTable, setTemperatureDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchData = async (startDate = startDate, endDate = endDate) => {
    setLoading(true);
    try {
      const params = {};
      if (startDate) params.start_time = startDate;
      if (endDate) params.end_time = endDate;
      const response = await axios.get("http://127.0.0.1:8000/retrieve/", { params });
      console.log(response);
      if(response?.data?.data) {
        setTemperatureDataChart(response.data.data.chart_data || {});
        setTemperatureDataTable(response.data.data.table_data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setCountdown(60);
    }
  };

  // Fetch data on page load
  useEffect(() => {
    const end = Math.floor(Date.now() / 1000);
    const start = end - 30 * 24 * 60 * 60; // Last 30 days
    setStartDate(start);
    setEndDate(end);
    fetchData(start, end);
  }, []);

  // Auto-refresh logic (fetches every 60 seconds if enabled)
  useEffect(() => {
    if (autoRefresh) {
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            fetchData();
            return 60;  // Reset countdown
          }
          return prev - 1;
        });
      }, 1000); // Update counter every second

      return () => clearInterval(countdownInterval);  // Cleanup interval on unmount
    }
  }, [autoRefresh]);

  return (
    <>
      <Header onUploadClick={() => setUploadOpen(true)} onRetrieveClick={() => setRetrieveOpen(true)} />
      <Container sx={{ marginTop: 10 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControlLabel
            control={<Switch checked={autoRefresh} onChange={() => setAutoRefresh(!autoRefresh)} />}
            label="Auto Refresh Every 60s"
          />
          { autoRefresh && (
            <Typography variant="body1" color="textSecondary">
              Refreshing in {countdown}s...
            </Typography>
          )}
        </Stack>
        {loading ? (
          <CircularProgress />
        ) : (
          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Temperature Trends (Last 30 Days)
              </Typography>
              <TemperatureChart data={temperatureDataChart} />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Temperature Values
              </Typography>
              <DataTable data={temperatureDataTable} />
            </Box>
          </Stack>
        )}
      </Container>
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} onUpload={() => fetchData()} />
      <GetDataModal open={retrieveOpen} onClose={() => setRetrieveOpen(false)} onRetrieve={fetchData} />
    </>
  );
};

export default App;