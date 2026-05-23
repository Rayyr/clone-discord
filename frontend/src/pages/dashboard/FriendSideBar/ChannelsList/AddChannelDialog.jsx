import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createChannel } from "../../../../api";
import { addChannel } from "../../../../store/actions/dashboardAction.js";

const AddChannelDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState("");

  const handleCreateChannel = async () => {
    if (!channelName.trim()) {
      return;
    }

    const response = await createChannel({ name: channelName });

    if (!response.error) {
      dispatch(addChannel(response.data.channel));
      setChannelName("");
      closeDialogHandler();
    }
  };

  return (
    <Dialog open={isDialogOpen} onClose={closeDialogHandler}>
      <DialogTitle>Create channel</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Channel name"
          fullWidth
          value={channelName}
          onChange={(event) => setChannelName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleCreateChannel();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialogHandler}>Cancel</Button>
        <Button variant="contained" onClick={handleCreateChannel}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddChannelDialog;
