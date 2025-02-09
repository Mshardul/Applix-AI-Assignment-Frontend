import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const StatisticsTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography>No data available</Typography>;
  }

  // Define table columns
  const columns = [
    { 
        field: "City",
        headerName: "City", 
        flex: 1,
        sortable: true,
        filterable: true
    },
    { 
        field: "Mean", 
        headerName: "Mean (°C)", 
        flex: 1,
        sortable: true,
        filterable: true
    },
    { 
        field: "Median", 
        headerName: "Median (°C)", 
        flex: 1,
        sortable: true,
        filterable: true
    },
    { 
        field: "Mode", 
        headerName: "Mode (°C)", 
        flex: 1,
        sortable: true,
        filterable: true
    },
    { 
        field: "Min", 
        headerName: "Min (°C)", 
        flex: 1,
        sortable: true,
        filterable: true
    },
    { 
        field: "Max", 
        headerName: "Max (°C)", 
        flex: 1,
        sortable: true,
        filterable: true
    },
    { 
        field: "Trend", 
        headerName: "Trend",
        flex: 1,
        sortable: true,
        filterable: true
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid rows={data} columns={columns} pageSize={10} pageSizeOptions={[10, 50, 100]} slots={{ toolbar: GridToolbar }} />
    </Box>
  );
};

export default StatisticsTable;