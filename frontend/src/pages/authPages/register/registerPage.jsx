 import React ,{useState,useEffect} from 'react';
  import AuthBox from '../../../components/AuthBox.jsx';
import RegisterHeader from './RegisterHeader.jsx';
import RegisterInputs from './RegisterInputs.jsx';
import RegisterFooter from './RegisterFooter.jsx';
import { validateRegisterForm } from '../../../utils/validates.js';
import {useDispatch} from 'react-redux';
import {register} from "../../../store/actions/authAction.js";
import {useNavigate} from 'react-router-dom';



const RegisterPage=()=> {
  const dispatch=useDispatch();
  const navigate=useNavigate();


 const [mail,setMail]=useState('');
   const [password,setPassword]=useState('');
      const [username,setUsername]=useState('');

   const [isFormated,setIsFormated]=useState(false);

   useEffect(()=>{

  setIsFormated(validateRegisterForm({mail,password,username}))
},[mail,password,username,setIsFormated])


 const handleRegister=async ()=>{
  
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
      <RegisterHeader/>
           <RegisterInputs
           
           mail={mail}
           setmail={setMail}
           password={password}
           setpassword={setPassword}
           username={username}
           setusername={setUsername}
           />

<RegisterFooter
isFormated={isFormated}  handleRegister={handleRegister}/>
        </AuthBox> 
  );
}

export default RegisterPage;
