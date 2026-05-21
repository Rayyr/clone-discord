 import React from 'react';
 import CustomPrimaryButton from '../../../components/CustomPrimaryButton';


  function LoginFooter({handleLogin,isFormated}) {
  return (
    <CustomPrimaryButton
    label="login"
    AdditionalStyle={{marginTop:"30px"}}
    disabled={isFormated}
    onClick={handleLogin}
    
    />
  );
}

export default LoginFooter;
