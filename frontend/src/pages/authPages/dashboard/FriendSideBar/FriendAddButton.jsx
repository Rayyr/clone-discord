 import React from 'react';
import {styled} from '@mui/system';
import CustomPrimaryButton from '../../../../components/CustomPrimaryButton';

  const additionalStyle= {
 marginTop:"10px",
 marginLeft:"5px",
 width:"80%",
 height:"30px",
 background:"#3ba55d"

  };
const FriendAddButton=()=> {
 const handleOpenAddFriendDialog=()=>{
    
 }
    return (
    <>
     <CustomPrimaryButton
     AdditionalStyle={additionalStyle}
     label="Add Friend"
     onClick={handleOpenAddFriendDialog}/>

       
    </> 
  );
}

export default FriendAddButton;
