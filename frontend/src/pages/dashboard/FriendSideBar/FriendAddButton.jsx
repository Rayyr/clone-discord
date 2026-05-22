 import React,{useState} from 'react';
import {styled} from '@mui/system';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import AddFriendDialog from './AddFriendDialog';


  const additionalStyle= {
 marginTop:"10px",
 marginLeft:"5px",
 width:"80%",
 height:"30px",
 background:"#3ba55d"

  };
const FriendAddButton=()=> {

const [isDialogOpen,setIsDialogOpen]=useState(false);

    const handleOpenAddFriendDialog=()=>{
    setIsDialogOpen(true);
 }

    const handleCloseAddFriendDialog=()=>{
    setIsDialogOpen(false);
 }

    return (
    <>
     <CustomPrimaryButton
     AdditionalStyle={additionalStyle}
     label="Add Friend"
     onClick={handleOpenAddFriendDialog}/>

       <AddFriendDialog
       isDialogOpen={isDialogOpen}
       closeDialogHandler={handleCloseAddFriendDialog}/>
    </> 
  );
}

export default FriendAddButton;
