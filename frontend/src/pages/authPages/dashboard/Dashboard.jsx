 import React from 'react';
  import {styled} from '@mui/system';
import SideBar from './SideBar/SideBar.jsx';
import FriendsSideBar from './FriendSideBar/FriendsSideBar.jsx';
import AppBar from './AppBar/AppBar.jsx';
import Messanger from './Messanger/Messanger.jsx';

  const Wrapper=styled('div')({
width:'100%',
height:"100vh",
display:'flex',
  })
const Dashboard=()=> {
  return (
    <Wrapper>
      <SideBar/>
        <FriendsSideBar/>
          <AppBar/>
            <Messanger/>
    </Wrapper> 
  );
}

export default Dashboard;
