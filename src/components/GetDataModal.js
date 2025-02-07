import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import dayjs from "dayjs";

const GetDataModal = ({ open, onClose, onRetrieve }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleRetrieve = () => {
    const startTimestamp = startDate ? dayjs(startDate).unix() : null;
    const endTimestamp = endDate ? dayjs(endDate).unix() : null;

    onRetrieve(startTimestamp, endTimestamp);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Retrieve Temperature Data</DialogTitle>
      <DialogContent>
        <TextField
          label="Start Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleRetrieve} variant="contained">Retrieve Data</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GetDataModal;