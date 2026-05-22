import React ,{useState} from "react";
import { styled } from "@mui/material";
 
import {Box,Tooltip,Typography } from "@mui/material";
import Avatar from "../../../../components/Avatar.jsx" ;
import InvitationDecisionButton from "./InvitationDecisionButton.jsx";



const PendingInvitationListItem = ({id,username,mail,acceptFriendInvitation=()=>{},rejectFriendInvitation=()=>{}}) => {
 const [buttonDisabled,setButtonDisabled]=useState(false);
 const handleAcceptFriendInvitation=()=>{
    acceptFriendInvitation({id});
    setButtonDisabled(true);

 }

  const handleRejectFriendInvitation=()=>{
    rejectFriendInvitation({id});
    setButtonDisabled(true);

 }
    return (
  <Tooltip title={mail} >
  
  <div style={{width:"100%"}}>
    <Box sx={{width:"100%",height:"42px",marginTop:"10px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Avatar username={username}/>
        <Typography sx={{marginLeft:"7px",
            fontWeight:700,
            color:"#8e9297",
            flexGrow:1,

        }}  variant="subtitle1">{username}</Typography>
  <InvitationDecisionButton
  disabled={buttonDisabled}
  acceptInvitationHandler={handleAcceptFriendInvitation}
  rejectInvitationHandler={handleRejectFriendInvitation}
  />
  
    </Box>
  </div>
    </Tooltip> 
  );
};

export default PendingInvitationListItem;
