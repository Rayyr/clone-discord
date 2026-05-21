 import React ,{useState,useEffect} from 'react';
  import AuthBox from '../../../components/AuthBox.jsx';
import LoginHeader from './RegisterHeader.jsx';
import LoginInputs from './RegisterInputs.jsx';
import LoginFooter from './RegisterFooter.jsx';
import { validateRegisterForm } from '../../../utils/validates.js';
import {useDispatch} from 'react-redux';
import {register} from "../../../store/actions/authAction.js";
import {useNavigate} from 'react-router-dom';



const LoginPage=()=> {
  const dispatch=useDispatch();
  const navigate=useNavigate();


 const [mail,setMail]=useState('');
   const [password,setPassword]=useState('');
      const [username,setUsername]=useState('');

   const [isFormated,setIsFormated]=useState(false);

   useEffect(()=>{

  setIsFormated(validateRegisterForm({mail,password,username}))
},[mail,password,username,setIsFormated])


 const handleLogin=async ()=>{
  
if(isFormated){
  const userDetails={
    mail,password,username
  }
  try{
await dispatch(register(userDetails,navigate));
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
           username={username}
           setusername={setUsername}
           />

<LoginFooter
isFormated={isFormated}  handleLogin={handleLogin}/>
        </AuthBox> 
  );
}

export default LoginPage;
