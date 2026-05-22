import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import PendingInvitationListItem from "./PendingInvitationListItem";
import {
  acceptFriendInvitation,
  getPendingInvitations,
  rejectFriendInvitation,
} from "../../../../api";
import { useDispatch } from "react-redux";
import { openAlertMessage } from "../../../../store/actions/alertAction";

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
  const dispatch=useDispatch();

  useEffect(()=>{
    const fetchPendingInvitations=async()=>{
      const response=await getPendingInvitations();

      if(!response.error){
        setInvitations(response.data.pendingInvitations);
      }
    };

    fetchPendingInvitations();
  },[]);

  const removeInvitation=(id)=>{
    setInvitations((currentInvitations)=>
      currentInvitations.filter((invitation)=>invitation._id!==id)
    );
  };

  const handleAcceptInvitation=async({id})=>{
    const response=await acceptFriendInvitation({id});

    if(response.error){
      dispatch(openAlertMessage(response?.error?.response?.data || "Something went wrong"));
      return;
    }

    removeInvitation(id);
    dispatch(openAlertMessage("Invitation accepted"));
  };

  const handleRejectInvitation=async({id})=>{
    const response=await rejectFriendInvitation({id});

    if(response.error){
      dispatch(openAlertMessage(response?.error?.response?.data || "Something went wrong"));
      return;
    }

    removeInvitation(id);
    dispatch(openAlertMessage("Invitation rejected"));
  };

  return (
  <MainContainer>
    {invitations.map((invitation)=>(
      <PendingInvitationListItem
      key={invitation._id}
      id={invitation._id}
      username={invitation.senderId.username}
      mail={invitation.senderId.mail}
      acceptFriendInvitation={handleAcceptInvitation}
      rejectFriendInvitation={handleRejectInvitation}/>
    ))}
    </MainContainer> 
  );
};

export default PendingInvitationsList;
