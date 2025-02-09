import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with UTC support
dayjs.extend(utc);
dayjs.extend(timezone);

const GetDataModal = ({ open, onClose, onRetrieve }) => {
  const defaultStartDateTime = dayjs.utc().format("YYYY-MM-DDTHH:mm"); // Current time
  const defaultEndDateTime = dayjs.utc().add(30, "minute").format("YYYY-MM-DDTHH:mm"); // +30 mins

  const [startDateTime, setStartDateTime] = useState(defaultStartDateTime);
  const [endDateTime, setEndDateTime] = useState(defaultEndDateTime);

  useEffect(() => {
    if (open) {
      setStartDateTime(defaultStartDateTime);
      setEndDateTime(defaultEndDateTime);
    }
  }, [open]); // Reset times when modal opens

  const handleRetrieve = () => {
    console.log("pre set: ", startDateTime, endDateTime);

    const startTimestamp = startDateTime ? dayjs.utc(startDateTime).unix() : dayjs.utc(defaultStartDateTime).unix();
    const endTimestamp = endDateTime ? dayjs.utc(endDateTime).unix() : dayjs.utc(defaultEndDateTime).unix();

    console.log("datetime set: ", startDateTime, endDateTime);
    console.log("timestamp calculated: ", startTimestamp, endTimestamp);
    onRetrieve(startTimestamp, endTimestamp);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Retrieve Temperature Data</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          Please enter Date & Time in **UTC**
        </Typography>
        <TextField
          label="Start Date & Time (UTC)"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={startDateTime}
          onChange={(e) => {
            console.log("setting start date time: ", e);
            setStartDateTime(e.target.value + "");
          }}
          sx={{ mt: 2 }}
        />
        <TextField
          label="End Date & Time (UTC)"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={endDateTime}
          onChange={(e) => {
            console.log("setting end date time: ", e);
            setEndDateTime(e.target.value + "");
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