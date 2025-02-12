import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";

const UploadModal = ({ open, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      const response = await axios.post("https://applix-ai-assignment-production.up.railway.app/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      if(response?.data?.status?.toLowerCase() === "success") {
        setIsSuccess(true);
        setMessage(`Success: ${response.data.message}`);
      } else {
        setIsSuccess(false);
        setMessage(`Error: ${error.response?.data?.message}`);
      }
      setMessage(`Success: ${response.data.message}`);
      onUpload(); // Refresh data after upload
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || "Failed to upload file"}`);
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
          {message && (
            <Typography color={isSuccess ? "success" : "error"}>{message}</Typography>
          )}
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