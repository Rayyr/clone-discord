 import React from 'react';
 import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import RedirectInfo from '../../../components/RedirectInfo';
import {useNavigate} from 'react-router-dom';
import {Tooltip} from "@mui/material";

  function RegisterFooter({handleLogin,isFormated}) {
 const Navigate=useNavigate();

    const handlePushToLoginPage=()=>{
Navigate('/login');
 }

 const getFormatedValidMessage=()=>{
    return "Press to register";
 }

  const getFormatedNotValidMessage=()=>{
    return "Enter correct email address and password should contains 6 to 12 characters and username should be between 2 toi 12 charcters";
 }
    return (

    <>
    <Tooltip
    title={!isFormated?getFormatedNotValidMessage():getFormatedValidMessage()}>
    <div>
    <CustomPrimaryButton
    label="Register"
    AdditionalStyle={{marginTop:"30px"}}
    disabled={!isFormated}
    onClick={handleLogin}
    
    />
</div>
</Tooltip>
    <RedirectInfo
    text=""
     redirectText="Already have an account?"
     additionalStyles={{marginTop:'5px'}}
     redirectHandler={handlePushToLoginPage}
    
    />
</>

  );
}

export default RegisterFooter;
