import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const ChannelAddButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        minWidth: "28px",
        width: "28px",
        height: "28px",
        color: "#b9bbbe",
      }}
      title="Create channel"
    >
      <AddIcon fontSize="small" />
    </Button>
  );
};

export default ChannelAddButton;
