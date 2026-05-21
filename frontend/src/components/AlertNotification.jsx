 import React from 'react';
 import Alert from '@mui/material/Alert';
 import {Snackbar} from "@mui/material";


  function AlertNotification({mail,setmail,password,setpassword}) {
  return (

    <Snackbar
    onhorOrigin={{vertical:"bottom",horizantal:"center"}}
    open
    ocClose={()=>{}}>

        <Alert severity="info">Alert Massege</Alert>
    </Snackbar>
  );
}

export default AlertNotification;
