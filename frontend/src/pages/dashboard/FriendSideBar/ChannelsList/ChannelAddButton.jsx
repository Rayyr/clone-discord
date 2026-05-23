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
        borderRadius: "50%",
        color: "#b9bbbe",
        padding: 0,
        "&:hover": {
          backgroundColor: "#40444b",
          color: "#ffffff",
        },
      }}
      title="Create channel"
    >
      <AddIcon fontSize="small" />
    </Button>
  );
};

export default ChannelAddButton;
