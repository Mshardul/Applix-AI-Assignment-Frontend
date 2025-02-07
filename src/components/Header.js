import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CachedIcon from '@mui/icons-material/Cached';

const Header = ({ onUploadClick, onRetrieveClick }) => {
  return (
    <AppBar position="fixed" sx={{ top: 0, zIndex: 1100, backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Left: Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          Temperature Monitor
        </Typography>

        {/* Right: Upload & Retrieve Icons */}
        <IconButton color="inherit" onClick={onRetrieveClick}>
          <CachedIcon />
        </IconButton>
        <IconButton color="inherit" onClick={onUploadClick}>
          <CloudUploadIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;