import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import FriendsListItem from "./FriendsListItem";
import { getFriends } from "../../../../api";
import { useSelector } from "react-redux";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList=( )=> {
  const [friends,setFriends]=useState([]);
  const onlineUsers=useSelector((state)=>state.dashboard.onlineUsers);

  useEffect(()=>{
    const fetchFriends=async()=>{
      const response=await getFriends();

      if(!response.error){
        setFriends(response.data.friends);
      }
    };

    fetchFriends();
  },[]);

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
