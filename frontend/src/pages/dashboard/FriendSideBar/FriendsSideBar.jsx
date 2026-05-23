 import React from 'react';
  import {styled} from '@mui/system';
import FriendAddButton from './FriendAddButton';
import FriendsTitle from './FriendsTitle';
import FriendsList from './FriendsList/FriendsList';
import ChannelsList from './ChannelsList/ChannelsList';
import PendingInvitationsList from './PendingInvitationsList/PendingInvitationsList';


  const MainContainer=styled('div')({
width:"224px",
height:"100%",
display:"flex",
flexDirection:"column",
alignItems:"center",
backgroundColor:"#2F3136"
  })
const FriendsSideBar=()=> {
  return (
    <MainContainer>
     <FriendAddButton/>
     <ChannelsList/>
     <FriendsTitle title='PRIVATE MESSAGES'/>
      <FriendsList/>
           <FriendsTitle title='INVITATIONS'/>
           <PendingInvitationsList />

    </MainContainer> 
  );
}

export default FriendsSideBar;
