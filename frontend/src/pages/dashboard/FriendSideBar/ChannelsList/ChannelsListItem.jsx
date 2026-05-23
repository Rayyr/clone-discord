import React from "react";
import Button from "@mui/material/Button";
import TagIcon from "@mui/icons-material/Tag";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { joinChannel, leaveChannel } from "../../../../api";
import {
  setChosenChatDetails,
  updateChannel,
} from "../../../../store/actions/dashboardAction.js";

const ChannelsListItem = ({ id, name, isMember }) => {
  const dispatch = useDispatch();

  const handleChooseChannel = () => {
    if (!isMember) {
      return;
    }

    dispatch(setChosenChatDetails({
      id,
      name,
      username: name,
      type: "channel",
    }));
  };

  const handleMembershipChange = async (event) => {
    event.stopPropagation();

    const response = isMember
      ? await leaveChannel(id)
      : await joinChannel(id);

    if (!response.error) {
      dispatch(updateChannel(response.data.channel));
    }
  };

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        height: "34px",
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        gap: "6px",
        overflow: "hidden",
      }}
    >
      <Button
        onClick={handleChooseChannel}
        disabled={!isMember}
        style={{
          flexGrow: 1,
          flexShrink: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "none",
          color: isMember ? "#8e9297" : "#5f646b",
          padding: 0,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <TagIcon sx={{ fontSize: "18px", marginRight: "6px", flexShrink: 0 }} />
        <Typography
          style={{
            fontWeight: 700,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          variant="subtitle2"
          align="left"
        >
          {name}
        </Typography>
      </Button>
      <Button
        onClick={handleMembershipChange}
        size="small"
        sx={{
          minWidth: "44px",
          width: "44px",
          flexShrink: 0,
          height: "24px",
          color: isMember ? "#b9bbbe" : "#ffffff",
          backgroundColor: isMember ? "transparent" : "#3ba55d",
          fontSize: "11px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: isMember ? "#ed4245" : "#2d7d46",
            color: "#ffffff",
          },
        }}
      >
        {isMember ? "Leave" : "Join"}
      </Button>
    </div>
  );
};

export default ChannelsListItem;
