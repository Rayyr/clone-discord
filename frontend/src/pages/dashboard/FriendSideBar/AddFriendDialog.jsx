import React,{useState,useEffect} from "react";
 
 import { validateEmail } from "../../../utils/validates";
import Dialog from '@mui/material/Dialog';
import DialogActions  from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import InputWithLabel from "../../../components/InputWithLabel";
import CustomPrimaryButton from "../../../components/CustomPrimaryButton";
import { sendFriendInvitation as sendFriendInvitationRequest } from "../../../api";
import { useDispatch } from "react-redux";
import { openAlertMessage } from "../../../store/actions/alertAction";


const AddFriendDialog=({isDialogOpen,closeDialogHandler})=> {

    const dispatch=useDispatch();
    const [mail,setMail]=useState('');
    const [isFormValid,setIsFormValid]=useState(false);
    const handleSendInvitation=async()=>{
        const response=await sendFriendInvitationRequest({
            targetMailAddress:mail
        });

        if(response.error){
            dispatch(openAlertMessage(response?.error?.response?.data || "Something went wrong"));
            return;
        }

        dispatch(openAlertMessage("Invitation sent"));
        handleCloseDialog();
    };
    const handleCloseDialog=()=>{
        closeDialogHandler();
        setMail('');
    };
    useEffect(()=>{
        setIsFormValid(validateEmail(mail))
    },[mail,setIsFormValid])
  return (
    <div>
    <Dialog
    open={isDialogOpen}
    onClose={handleCloseDialog}>
    <DialogTitle>
        <Typography>
            Invite a friend
        </Typography>  
    </DialogTitle>
    <DialogContent>
<DialogContentText>
    Enter e-mail address of friend which you would like to invite
</DialogContentText>

 <InputWithLabel
    label="Email"
    type="text"
    value={mail}
    setValue={setMail}
    placeholder="Enter e-mail address"
    />
    
   

    </DialogContent>
   
   <DialogActions>
    <CustomPrimaryButton
    onClick={handleSendInvitation}
    disabled={!isFormValid}
    label="Send"
    AdditionalStyle={{
        marginLeft:"15px"
        ,marginRight:"15px",
        marginBottom:"10px"
    }}
    />   


   </DialogActions>
    </Dialog> 
    </div>
  );
}

export default  AddFriendDialog;
