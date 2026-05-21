 import React from 'react';
 import Alert from '@mui/material/Alert';
 import {Snackbar} from "@mui/material";
import {useDispatch,useSelector} from 'react-redux';
import {closeAlertMessage} from './../store/actions/alertAction.js';


  function AlertNotification({mail,setmail,password,setpassword}) {
  const dispatch=useDispatch();
  const alertContent=useSelector((state)=>state.alert.alertMessageContent);
const show=useSelector((state)=>state.alert.showAlertMessage);
const close=()=>dispatch(closeAlertMessage());

    return (

    <Snackbar
    anchorOrigin={{vertical:"bottom",horizontal:"center"}}
    open={show}
    onClose={close}
    autoHideDuration={2000}>

        <Alert severity="info">{alertContent}</Alert>
    </Snackbar>
  );
}

export default AlertNotification;
