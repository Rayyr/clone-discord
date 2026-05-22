import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
 import Avatar from "../../../../components/Avatar.jsx"
import OnlineIndicator from "./OnlineIndicator.jsx";
import { useDispatch } from "react-redux";
import { setChosenChatDetails } from "../../../../store/actions/dashboardAction.js";

const FriendsListItem=({id,username,isOnline})=> {
  const dispatch=useDispatch();

  const handleChooseActiveConversation=()=>{
    dispatch(setChosenChatDetails({
      id,
      username,
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
        position:"relative"
    }}>
    
    <Avatar
    username={username}/>
    <Typography
    style={{marginLeft:"7px",
        fontWeight:700,
        color:"#8e9297"
    }}
    variant="subtitle"
    align="left">

{username}
    </Typography>
    {isOnline&& <OnlineIndicator/>}
    </Button> 
  );
}

export default FriendsListItem;
