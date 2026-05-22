import React from "react";
import { styled } from "@mui/material";
import PendingInvitationListItem from "./PendingInvitationListItem";


const DUMMY_INVITATIONS=[
  {
    _id:"1",
    senderId:{
      username:"mahmood",
      mail:"mahmood@gmail.com",
    }
  },
    {
    _id:"2",
    senderId:{
      username:"ahmad",
      mail:"ahmad@gmail.com",
    }
  }

]
const MainContainer = styled("div")({
  width:"100%",
  height:"22%",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  overflow:"auto"
});

const PendingInvitationsList = () => {
  return (
  <MainContainer>
    {DUMMY_INVITATIONS.map((invitation)=>(
      <PendingInvitationListItem
      key={invitation._id}
      id={invitation._id}
      username={invitation.senderId.username}
      mail={invitation.senderId.mail}/>
    ))}
    </MainContainer> 
  );
};

export default PendingInvitationsList;
