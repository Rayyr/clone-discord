 import React from 'react';
  import InputWithLabel from '../../../components/InputWithLabel';
function RegisterInputs({mail,setmail,password,setpassword,username,setusername}) {
  return (
    <>
    <InputWithLabel 
    value ={mail}
    setValue={setmail}
    label="E-mail"
    type="text"
    placeholder="Enter e-mail address"
    />
      
        <InputWithLabel 
    value ={password}
    setValue={setpassword}
    label="password"
    type="password"
    placeholder="Enter password"
    />


       <InputWithLabel 
    value ={username}
    setValue={setusername}
    label="username"
    type="text"
    placeholder="Enter username"
    />   
        </>
  );
}

export default RegisterInputs;
