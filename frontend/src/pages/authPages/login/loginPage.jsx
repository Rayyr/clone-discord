 import React ,{useState,useEffect} from 'react';
  import AuthBox from '../../../components/AuthBox.jsx';
import LoginHeader from './LoginHeader.jsx';
import LoginInputs from './LoginInputs.jsx';
import LoginFooter from './LoginFooter.jsx';
import { validateLoginForm } from '../../../utils/validates.js';
import {useDispatch} from 'react-redux';
import {login} from "../../../store/actions/authAction.js";
import {useNavigate} from 'react-router-dom';
 


const LoginPage=()=> {
   const dispatch=useDispatch();
   const navigate=useNavigate();
 

  const [mail,setMail]=useState('');
   const [password,setPassword]=useState('');
   const [isFormated,setIsFormated]=useState(false);

   useEffect(()=>{

  setIsFormated(validateLoginForm({mail,password}))
},[mail,password,setIsFormated])


 const handleLogin=async()=>{
  
if(isFormated){
  const userDetails={
    mail,password
  }
  try{
await dispatch(login(userDetails,navigate));
  }catch(error){

  }
 }
}
  return (
    <AuthBox>
      <LoginHeader/>
           <LoginInputs
           
           mail={mail}
           setmail={setMail}
           password={password}
           setpassword={setPassword}
           />

<LoginFooter
isFormated={isFormated}  handleLogin={handleLogin}/>
        </AuthBox> 
  );
}

export default LoginPage;
