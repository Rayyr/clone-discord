import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getChannels } from "../../../../api";
import { setChannels } from "../../../../store/actions/dashboardAction.js";
import AddChannelDialog from "./AddChannelDialog";
import ChannelAddButton from "./ChannelAddButton";
import ChannelsListItem from "./ChannelsListItem";

const MainContainer = styled("div")({
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "12px",
  overflow: "hidden",
});

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.dashboard.channels);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await getChannels();

      if (!response.error) {
        dispatch(setChannels(response.data.channels));
      }
    };

    fetchChannels();
  }, [dispatch]);

  return (
    <MainContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px 0 12px",
          marginTop: "10px",
          marginBottom: "6px",
        }}
      >
        <Typography
          sx={{
            textTransform: "uppercase",
            color: "#8e9297",
            fontSize: "14px",
          }}
        >
          Channels
        </Typography>
        <ChannelAddButton onClick={() => setIsDialogOpen(true)} />
      </Box>
      {channels.map((channel) => (
        <ChannelsListItem
          key={channel.id}
          id={channel.id}
          name={channel.name}
          isMember={channel.isMember}
        />
      ))}
      <AddChannelDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={() => setIsDialogOpen(false)}
      />
    </MainContainer>
  );
};

export default ChannelsList;
