import React, { useEffect } from "react";
import { styled } from "@mui/material";
import FriendsListItem from "./FriendsListItem";
import { getFriends } from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../../../store/actions/dashboardAction.js";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList=( )=> {
  const dispatch=useDispatch();
  const friends=useSelector((state)=>state.dashboard.friends);
  const onlineUsers=useSelector((state)=>state.dashboard.onlineUsers);

  useEffect(()=>{
    const fetchFriends=async()=>{
      const response=await getFriends();

      if(!response.error){
        dispatch(setFriends(response.data.friends));
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
      />
    ))}
    </MainContainer> 
  );
}

export default FriendsList;
