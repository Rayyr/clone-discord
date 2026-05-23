import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
 import Avatar from "../../../../components/Avatar.jsx"
import OnlineIndicator from "./OnlineIndicator.jsx";
import { useDispatch } from "react-redux";
import { setChosenChatDetails } from "../../../../store/actions/dashboardAction.js";

const FriendsListItem=({id,username,isOnline,unreadCount})=> {
  const dispatch=useDispatch();

  const handleChooseActiveConversation=()=>{
    dispatch(setChosenChatDetails({
      id,
      username,
      type:"direct",
    }));
  };

  return (
    <Button
    onClick={handleChooseActiveConversation}
    style={{
        width:"100%",
        height:"42px",
        marginTop:"10px",
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-start",
        textTransform:"none",
        color:"black",
        position:"relative",
        paddingRight:isOnline ? "34px" : "8px"
    }}>
    
    <Avatar
    username={username}/>
    <Typography
    style={{marginLeft:"7px",
        fontWeight:700,
        color: unreadCount > 0 ? "#ffffff" : "#8e9297",
        maxWidth:"130px",
        overflow:"hidden",
        textOverflow:"ellipsis",
        whiteSpace:"nowrap",
    }}
    variant="subtitle"
    align="left">

{username}
    </Typography>
    {unreadCount > 0 && (
      <Box
      sx={{
        minWidth:"18px",
        height:"18px",
        padding:"0 6px",
        borderRadius:"999px",
        backgroundColor:"#ed4245",
        color:"#ffffff",
        fontSize:"12px",
        fontWeight:700,
        lineHeight:"18px",
        textAlign:"center",
        marginLeft:"8px",
      }}>
        {unreadCount}
      </Box>
    )}
    {isOnline&& <OnlineIndicator/>}
    </Button> 
  );
}

export default FriendsListItem;
