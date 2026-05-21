 import React from 'react';
 import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import RedirectInfo from '../../../components/RedirectInfo';
import {useNavigate} from 'react-router-dom';
import {Tooltip} from "@mui/material";

  function LoginFooter({handleLogin,isFormated}) {
 const Navigate=useNavigate();

    const handlePushToRegisterPage=()=>{
Navigate('/register');
 }

 const getFormatedValidMessage=()=>{
    return "Press to log in ";
 }

  const getFormatedNotValidMessage=()=>{
    return "Enter correct email address and password should contains 6 to 12 characters";
 }
    return (

    <>
    <Tooltip
    title={!isFormated?getFormatedNotValidMessage():getFormatedValidMessage()}>
    <div>
    <CustomPrimaryButton
    label="login"
    AdditionalStyle={{marginTop:"30px"}}
    disabled={!isFormated}
    onClick={handleLogin}
    
    />
</div>
</Tooltip>
    <RedirectInfo
    text="Need an account"
     redirectText={"Create an account"}
     additionalStyles={{marginTop:'5px'}}
     redirectHandler={handlePushToRegisterPage}
    
    />
</>

  );
}

export default LoginFooter;
