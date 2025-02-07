import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";

const UploadModal = ({ open, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage(""); // Reset message on new file selection
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(`Success: ${response.data.message}`);
      onUpload(); // Refresh data after upload
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.detail || "Failed to upload file"}`);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Temperature Data</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>Select a CSV or XLSX file to upload:</Typography>
          <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
          {message && <Typography color="error">{message}</Typography>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>Cancel</Button>
        <Button onClick={handleUpload} disabled={!selectedFile || uploading} variant="contained">
          {uploading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;