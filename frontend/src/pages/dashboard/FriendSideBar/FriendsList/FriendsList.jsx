import React, { useEffect } from "react";
import { styled } from "@mui/material";
import FriendsListItem from "./FriendsListItem";
import { getFriends, getUnreadMessages } from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setUnreadMessages } from "../../../../store/actions/dashboardAction.js";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList=( )=> {
  const dispatch=useDispatch();
  const friends=useSelector((state)=>state.dashboard.friends);
  const onlineUsers=useSelector((state)=>state.dashboard.onlineUsers);
  const unreadMessages=useSelector((state)=>state.dashboard.unreadMessages);

  useEffect(()=>{
    const fetchFriends=async()=>{
      const response=await getFriends();

      if(!response.error){
        dispatch(setFriends(response.data.friends));
      }

      const unreadResponse=await getUnreadMessages();

      if(!unreadResponse.error){
        dispatch(setUnreadMessages(unreadResponse.data.unreadMessages));
      }
    };

    fetchFriends();
  },[dispatch]);

  return (
    <MainContainer>
    {friends.map((f)=>(
      <FriendsListItem
      username={f.username}
      id={f._id}
      key={f._id} 
      isOnline={onlineUsers.includes(f._id.toString())}
      unreadCount={unreadMessages[f._id] || 0}
      />
    ))}
    </MainContainer> 
  );
}

export default FriendsList;
