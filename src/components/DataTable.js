import React from "react";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const DataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography>No data available</Typography>;
  }

  // Define table columns
  const columns = [
    { 
      field: "location", 
      headerName: "Location", 
      flex: 1,
      sortable: true,
      filterable: true
    },
    { 
      field: "time", 
      headerName: "Time", 
      flex: 1,
      sortable: true,
      filterable: true
    },
    { 
      field: "temperature", 
      headerName: "Temperature (°C)", 
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

export default DataTable;