 import React ,{useState,useEffect} from 'react';
  import AuthBox from '../../../components/AuthBox.jsx';
import LoginHeader from './RegisterHeader.jsx';
import LoginInputs from './RegisterInputs.jsx';
import LoginFooter from './RegisterFooter.jsx';
import { validateRegisterForm } from '../../../utils/validates.js';
const LoginPage=()=> {
 const [mail,setMail]=useState('');
   const [password,setPassword]=useState('');
      const [username,setUsername]=useState('');

   const [isFormated,setIsFormated]=useState(false);

   useEffect(()=>{

  setIsFormated(validateRegisterForm({mail,password,username}))
},[mail,password,setIsFormated])


 const handleLogin=()=>{
  console.log(mail);
   console.log(password);
   console.log(username);

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
