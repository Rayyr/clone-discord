import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  readMessages,
  sendChannelMessage,
  sendDirectMessage,
} from "../../realTimeConnection.jsx/SocketConnection.jsx";
import {
  getChannelMessages,
  getDirectMessagesHistory,
} from "../../../api.js";
import { setMessages } from "../../../store/actions/dashboardAction.js";

const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  marginTop: "48px",
  display: "flex",
});

const MessagesContainer = styled("div")({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  overflow: "auto",
});

const NewMessageContainer = styled("div")({
  height: "64px",
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  gap: "10px",
});

const Messanger = () => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const chosenChatDetails = useSelector((state) => state.dashboard.chosenChatDetails);
  const messages = useSelector((state) => state.dashboard.messages);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const channels = useSelector((state) => state.dashboard.channels);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chosenChatDetails) {
        dispatch(setMessages([]));
        return;
      }

      if (chosenChatDetails.type === "channel") {
        const activeChannel = channels.find((channel) => channel.id === chosenChatDetails.id);

        if (!activeChannel?.isMember) {
          dispatch(setMessages([]));
          return;
        }
      }

      const response = chosenChatDetails.type === "channel"
        ? await getChannelMessages(chosenChatDetails.id)
        : await getDirectMessagesHistory(chosenChatDetails.id);

      if (!response.error) {
        dispatch(setMessages(response.data.messages));
      }
    };

    fetchMessages();
  }, [channels, chosenChatDetails, dispatch]);

  const activeMessages = chosenChatDetails ? messages.filter((m) => {
    if (chosenChatDetails.type === "channel") {
      return m.channelId === chosenChatDetails.id;
    }

    return m.senderUserId === chosenChatDetails.id ||
      m.receiverUserId === chosenChatDetails.id;
  }) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  useEffect(() => {
    if (!chosenChatDetails || chosenChatDetails.type === "channel") {
      return;
    }

    const hasUnreadIncomingMessage = activeMessages.some((m) =>
      m.senderUserId === chosenChatDetails.id && !m.isRead
    );

    if (hasUnreadIncomingMessage) {
      readMessages({
        senderUserId: chosenChatDetails.id,
      });
    }
  }, [activeMessages, chosenChatDetails]);

  const getMessageTime = (date) => {
    return new Date(date).toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !chosenChatDetails) {
      return;
    }

    if (chosenChatDetails.type === "channel") {
      sendChannelMessage({
        channelId: chosenChatDetails.id,
        content: message,
      });
    } else {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
    }

    setMessage("");
  };

  return (
    <MainContainer>
      {chosenChatDetails ? (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              padding: "20px",
              borderBottom: "1px solid #202225",
            }}
          >
            {chosenChatDetails.type === "channel" ? `# ${chosenChatDetails.name}` : chosenChatDetails.username}
          </Typography>
          <MessagesContainer>
            {activeMessages.map((m, index) => {
              const isOwnMessage = m.senderUserId === userDetails?.userId;

              return (
                <Box
                  key={`${m.id || m.date}-${index}`}
                  sx={{
                    alignSelf: isOwnMessage ? "flex-end" : "flex-start",
                    marginBottom: "8px",
                    maxWidth: "70%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isOwnMessage ? "flex-end" : "flex-start",
                  }}
                >
                  {chosenChatDetails.type === "channel" && !isOwnMessage && (
                    <Typography
                      sx={{
                        color: "#b9bbbe",
                        fontSize: "12px",
                        fontWeight: 700,
                        marginBottom: "3px",
                      }}
                    >
                      {m.senderUsername || "User"}
                    </Typography>
                  )}
                  <Typography
                    sx={{
                      color: "#ffffff",
                      backgroundColor: isOwnMessage ? "#5865f2" : "#2f3136",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      wordBreak: "break-word",
                    }}
                  >
                    {m.content}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#8e9297",
                      fontSize: "11px",
                      marginTop: "3px",
                    }}
                  >
                    {getMessageTime(m.date)}
                    {isOwnMessage && chosenChatDetails.type !== "channel" && ` - ${m.isRead ? "Read" : "Sent"}`}
                  </Typography>
                </Box>
              );
            })}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          <NewMessageContainer>
            <TextField
              fullWidth
              size="small"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSendMessage();
                }
              }}
              placeholder={`Message ${chosenChatDetails.type === "channel" ? `#${chosenChatDetails.name}` : chosenChatDetails.username}`}
              sx={{ input: { color: "#ffffff" }, backgroundColor: "#40444b" }}
            />
            <Button variant="contained" onClick={handleSendMessage}>Send</Button>
          </NewMessageContainer>
        </Box>
      ) : (
        <Typography
          sx={{
            color: "#8e9297",
            padding: "20px",
          }}
        >
          Choose a friend or channel to start chatting
        </Typography>
      )}
    </MainContainer>
  );
};

export default Messanger;
