import React, { useEffect } from "react";
import { styled } from "@mui/material";
import PendingInvitationListItem from "./PendingInvitationListItem";
import {
  acceptFriendInvitation,
  getFriends,
  getPendingInvitations,
  rejectFriendInvitation,
} from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { openAlertMessage } from "../../../../store/actions/alertAction";
import {
  removePendingInvitation,
  setFriends,
  setPendingInvitations,
} from "../../../../store/actions/dashboardAction";

const MainContainer = styled("div")({
  width:"100%",
  height:"22%",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  overflow:"auto"
});

const PendingInvitationsList = () => {
  const invitations=useSelector((state)=>state.dashboard.pendingInvitations);
  const dispatch=useDispatch();

  useEffect(()=>{
    const fetchPendingInvitations=async()=>{
      const response=await getPendingInvitations();

      if(!response.error){
        dispatch(setPendingInvitations(response.data.pendingInvitations));
      }
    };

    fetchPendingInvitations();
  },[dispatch]);

  const removeInvitation=(id)=>{
    dispatch(removePendingInvitation(id));
  };

  const handleAcceptInvitation=async({id})=>{
    const response=await acceptFriendInvitation({id});

    if(response.error){
      dispatch(openAlertMessage(response?.error?.response?.data || "Something went wrong"));
      return;
    }

    removeInvitation(id);
    const friendsResponse=await getFriends();
    if(!friendsResponse.error){
      dispatch(setFriends(friendsResponse.data.friends));
    }
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
