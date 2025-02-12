import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, Container, Stack, Box, Typography, CircularProgress, Switch, FormControlLabel } from "@mui/material";
import Header from "./components/Header.js";
import UploadModal from "./components/UploadModal.js";
import GetDataModal from "./components/GetDataModal.js";
import TemperatureChart from "./components/TemperatureChart.js";
import DataTable from "./components/DataTable.js";
import axios from "axios";
import StatisticsTable from "./components/StatisticsTable.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with UTC support
dayjs.extend(utc);
dayjs.extend(timezone);


const App = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [retrieveOpen, setRetrieveOpen] = useState(false);
  const [temperatureDataChart, setTemperatureDataChart] = useState({});
  const [temperatureDataTable, setTemperatureDataTable] = useState([]);
  const [statisticsDataTable, setStatisticsDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const fetchData = async (startDateArg=startDateTime, endDateArg=endDateTime) => {
    setLoading(true);

    try {
        const params = { "start_time": startDateArg, "end_time": endDateArg };
        console.log("Fetching data with params:", params);

        const response = await axios.get("http://https://applix-ai-assignment-production.up.railway.app/retrieve/", { params });

        if (response?.data?.data) {
            setTemperatureDataChart(response.data.data.chart_data || {});
            setTemperatureDataTable(response.data.data.table_data || []);
            setStatisticsDataTable(response.data.data.stats_data || []);
            setStartDateTime(startDateArg);
            setEndDateTime(endDateArg);
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
    setStartDateTime(start);
    setEndDateTime(end);
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

        {startDateTime && endDateTime && (
          <Box sx={{ width: "100%", position: "relative" }}>
            <Alert severity="info" sx={{ borderRadius: 0, width: "100%" }}>
              <AlertTitle>Data Filter Applied</AlertTitle>
              <strong>{dayjs.utc(startDateTime * 1000).format("DD/MM/YYYY hh:mm A")}</strong> - <strong>{dayjs.utc(endDateTime * 1000).format("DD/MM/YYYY hh:mm A")}</strong>
            </Alert>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: "auto" }}>
            {autoRefresh && (
              <Typography variant="body1" color="textSecondary">
                Refreshing in {countdown}s...
              </Typography>
            )}
            <FormControlLabel
              control={<Switch checked={autoRefresh} onChange={() => setAutoRefresh(!autoRefresh)} />}
              label="Auto Refresh Every 60s"
            />
          </Stack>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <Stack spacing={4}>

            <Box>
              <Typography variant="h5" gutterBottom>
                Temperature Chart
              </Typography>
              <TemperatureChart data={temperatureDataChart} />
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom>
                Temperature Values
              </Typography>
              <DataTable data={temperatureDataTable} />
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom>
                Temperature Statistics
              </Typography>
              <StatisticsTable data={statisticsDataTable} />
            </Box>

          </Stack>
        )}
      </Container>
      <UploadModal 
        open={uploadOpen} 
        onClose={() => setUploadOpen(false)} 
        onUpload={() => fetchData()} 
      />
      <GetDataModal 
        open={retrieveOpen} 
        onClose={() => setRetrieveOpen(false)} 
        startDateTime={startDateTime}
        endDateTime={endDateTime}
        onRetrieve={(start, end) => fetchData(start, end)}
      />
    </>
  );
};

export default App;