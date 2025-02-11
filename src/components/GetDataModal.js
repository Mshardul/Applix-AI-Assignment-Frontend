import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Typography, TextField, Box, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with UTC support
dayjs.extend(utc);
dayjs.extend(timezone);

const GetDataModal = ({ open, onClose, onRetrieve, startDateTime, endDateTime }) => {
  const [localStartDateTime, setLocalStartDateTime] = useState(startDateTime);
  const [localEndDateTime, setLocalEndDateTime] = useState(endDateTime);

  useEffect(() => {
    if (open) {
      setLocalStartDateTime(startDateTime);
      setLocalEndDateTime(endDateTime);
    }
  }, [open, startDateTime, endDateTime]);

  const handleRetrieve = () => {
    console.log("pre set: ", localStartDateTime, localEndDateTime);
    if (!localStartDateTime || !localEndDateTime || localStartDateTime > localEndDateTime) {
      console.error("Invalid date range selected");
      return;
    }

    console.log("Retrieving data from", localStartDateTime, "to", localEndDateTime);
    onRetrieve(localStartDateTime, localEndDateTime);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Retrieve Temperature Data</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          Please enter Date & Time in <strong>UTC</strong>
        </Typography>
        <TextField
          label="Start Date & Time (UTC)"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dayjs.utc(localStartDateTime * 1000).format("YYYY-MM-DDTHH:mm")}
          onChange={(e) => {
            console.log("setting start date time: ", e);
            setLocalStartDateTime(dayjs.utc(e.target.value).unix());
          }}
          sx={{ mt: 2 }}
        />
        <TextField
          label="End Date & Time (UTC)"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dayjs.utc(localEndDateTime * 1000).format("YYYY-MM-DDTHH:mm")}
          onChange={(e) => {
            console.log("setting end date time: ", e);
            setLocalEndDateTime(dayjs.utc(e.target.value).unix());
          }}
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