 import React,{useEffect} from 'react';
  import {styled} from '@mui/system';
import SideBar from './SideBar/SideBar.jsx';
import FriendsSideBar from './FriendSideBar/FriendsSideBar.jsx';
import AppBar from './AppBar/AppBar.jsx';
import Messanger from './Messanger/Messanger.jsx';
import logout from '../../utils/auth.js';
import {useDispatch} from "react-redux";
import { setUserDetails   } from '../../store/actions/authAction.js';
import { connectionSocketServer } from '../realTimeConnection.jsx/SocketConnection.jsx';
  const Wrapper=styled('div')({
width:'100%',
height:"100vh",
display:'flex',
  })
const Dashboard=()=> {
  const dispatch=useDispatch();
 useEffect(()=>{
const userDetails=localStorage.getItem("user");
if(!userDetails){
  logout();
} else{
  dispatch(setUserDetails(userDetails));
connectionSocketServer();
}
},[])
 
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
