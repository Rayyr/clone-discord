import React from "react";
import { styled } from "@mui/material";
import FriendsListItem from "./FriendsListItem";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const Dummy_Friends=[
  {
    id:1,
    username:"mahmood",
    isOnline:true
  }
,
    {
    id:2,
    username:"ali",
    isOnline:false
  },
    {
    id:3,
    username:"ahmad",
    isOnline:true
  }
];

const FriendsList=( )=> {
  return (
    <MainContainer>
    {Dummy_Friends.map((f)=>(
      <FriendsListItem
      username={f.username}
      id={f.id}
      key={f.id} 
      isOnline={f.isOnline}
      />
    ))}
    </MainContainer> 
  );
}

export default FriendsList;
