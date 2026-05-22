import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import PendingInvitationListItem from "./PendingInvitationListItem";
import { getPendingInvitations } from "../../../../api";

const MainContainer = styled("div")({
  width:"100%",
  height:"22%",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  overflow:"auto"
});

const PendingInvitationsList = () => {
  const [invitations,setInvitations]=useState([]);

  useEffect(()=>{
    const fetchPendingInvitations=async()=>{
      const response=await getPendingInvitations();

      if(!response.error){
        setInvitations(response.data.pendingInvitations);
      }
    };

    fetchPendingInvitations();
  },[]);

  return (
  <MainContainer>
    {invitations.map((invitation)=>(
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
