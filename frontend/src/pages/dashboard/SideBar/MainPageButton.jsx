 import React from 'react';
  import {styled} from '@mui/system';
 import Button from '@mui/material/Button';

 import GroupsIcon from '@mui/icons-material/Groups';
 import { useSelector } from 'react-redux';

const MainPageButton=()=> {
  const userDetails=useSelector((state)=>state.auth.userDetails);
  const username=userDetails?.username || "";
  const userInitial=username.charAt(0).toUpperCase();

  return (
    <>
    <Button
    style={{
        width:"48px",
        height:"48px",
        borderRadius:"16px",
        margin:0,
        padding:0,
        minWidth:0,
        marginTop:"10px",
        backgroundColor:"#5865f2",
        color:"white"

    }}>

      
     
       <GroupsIcon/> 
    </Button> 

{/* for the logged in user info */}
     <Button
    style={{
        width:"48px",
        height:"48px",
        borderRadius:"16px",
        margin:0,
        padding:0,
        minWidth:0,
        marginTop:"610px",
        
        backgroundColor:"#3BA55D",
        color:"white"
        

    }}>

      
      
     {JSON.parse(localStorage.getItem("user")).username}
       
    </Button> 
    </>
  );
}

export default MainPageButton;
