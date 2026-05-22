 import React, { useEffect, useRef, useState } from 'react';
  import {styled} from '@mui/system';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { readMessages, sendDirectMessage } from '../../realTimeConnection.jsx/SocketConnection.jsx';
import { getDirectMessagesHistory } from '../../../api.js';
import { setMessages } from '../../../store/actions/dashboardAction.js';


  const MainContainer=styled('div')({
flexGrow:1,
backgroundColor:"#36393f",
marginTop:"48px",
display:"flex"
  })
const MessagesContainer=styled('div')({
flexGrow:1,
display:"flex",
flexDirection:"column",
padding:"20px",
overflow:"auto"
})

const NewMessageContainer=styled('div')({
height:"64px",
display:"flex",
alignItems:"center",
padding:"0 20px",
gap:"10px"
})

const Messanger=()=> {
  const dispatch=useDispatch();
  const messagesEndRef=useRef(null);
  const chosenChatDetails=useSelector((state)=>state.dashboard.chosenChatDetails);
  const messages=useSelector((state)=>state.dashboard.messages);
  const userDetails=useSelector((state)=>state.auth.userDetails);
  const [message,setMessage]=useState("");

  useEffect(()=>{
    const fetchMessages=async()=>{
      if(!chosenChatDetails){
        dispatch(setMessages([]));
        return;
      }

      const response=await getDirectMessagesHistory(chosenChatDetails.id);

      if(!response.error){
        dispatch(setMessages(response.data.messages));
      }
    };

    fetchMessages();
  },[chosenChatDetails,dispatch]);

  const activeMessages=chosenChatDetails ? messages.filter((m)=>
    m.senderUserId===chosenChatDetails.id ||
    m.receiverUserId===chosenChatDetails.id
  ) : [];

  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
  },[activeMessages]);

  useEffect(()=>{
    if(!chosenChatDetails){
      return;
    }

    const hasUnreadIncomingMessage = activeMessages.some((m)=>
      m.senderUserId === chosenChatDetails.id && !m.isRead
    );

    if(hasUnreadIncomingMessage){
      readMessages({
        senderUserId: chosenChatDetails.id,
      });
    }
  },[activeMessages,chosenChatDetails]);

 const getMessageTime = (date) => {
  return new Date(date).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  const handleSendMessage=()=>{
    if(!message.trim() || !chosenChatDetails){
      return;
    }

    sendDirectMessage({
      receiverUserId:chosenChatDetails.id,
      content:message,
    });

    setMessage("");
  };

  return (
    <MainContainer>
     {chosenChatDetails ? (
      <Box sx={{display:"flex",flexDirection:"column",width:"100%"}}>
        <Typography
        sx={{
          color:"#ffffff",
          fontWeight:700,
          padding:"20px",
          borderBottom:"1px solid #202225"
        }}>
          {chosenChatDetails.username}
        </Typography>
        <MessagesContainer>
          {activeMessages.map((m,index)=>{
            const isOwnMessage=m.senderUserId===userDetails?.userId;

            return (
            <Box
            key={`${m.date}-${index}`}
            sx={{
              alignSelf:isOwnMessage ? "flex-end" : "flex-start",
              marginBottom:"8px",
              maxWidth:"70%",
              display:"flex",
              flexDirection:"column",
              alignItems:isOwnMessage ? "flex-end" : "flex-start",
            }}>
              <Typography
              sx={{
                color:"#ffffff",
                backgroundColor:isOwnMessage ? "#5865f2" : "#2f3136",
                borderRadius:"6px",
                padding:"8px 10px",
                wordBreak:"break-word",
              }}>
                {m.content}
              </Typography>
              <Typography
              sx={{
                color:"#8e9297",
                fontSize:"11px",
                marginTop:"3px",
              }}>
                {getMessageTime(m.date)}
                {isOwnMessage && ` · ${m.isRead ? "Read" : "Sent"}`}
              </Typography>
            </Box>
          )})}
          <div ref={messagesEndRef}/>
        </MessagesContainer>
        <NewMessageContainer>
          <TextField
          fullWidth
          size="small"
          value={message}
          onChange={(event)=>setMessage(event.target.value)}
          onKeyDown={(event)=>{
            if(event.key==="Enter"){
              handleSendMessage();
            }
          }}
          placeholder={`Message ${chosenChatDetails.username}`}
          sx={{input:{color:"#ffffff"},backgroundColor:"#40444b"}}
          />
          <Button variant="contained" onClick={handleSendMessage}>Send</Button>
        </NewMessageContainer>
      </Box>
     ) : (
      <Typography
      sx={{
        color:"#8e9297",
        padding:"20px"
      }}>
        Choose a friend to start chatting
      </Typography>
     )}
      
    </MainContainer> 
  );
}

export default Messanger;
