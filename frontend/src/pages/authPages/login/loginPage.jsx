 import React ,{useState,useEffect} from 'react';
  import AuthBox from '../../../components/AuthBox.jsx';
import LoginHeader from './LoginHeader.jsx';
import LoginInputs from './LoginInputs.jsx';
import LoginFooter from './LoginFooter.jsx';
import { validateLoginForm } from '../../../utils/validates.js';
const LoginPage=()=> {
 const [mail,setMail]=useState('');
   const [password,setPassword]=useState('');
   const [isFormated,setIsFormated]=useState(false);

   useEffect(()=>{

  setIsFormated(validateLoginForm({mail,password}))
},[mail,password,setIsFormated])


 const handleLogin=()=>{
  console.log(mail);
   console.log(password);

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
