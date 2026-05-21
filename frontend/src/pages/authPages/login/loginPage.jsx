 import React ,{useState} from 'react';
  import AuthBox from '../../../components/AuthBox.jsx';
import LoginHeader from './LoginHeader.jsx';
import LoginInputs from './LoginInputs.jsx';
import LoginFooter from './LoginFooter.jsx';

const LoginPage=()=> {
 const [mail,setMail]=useState('');
   const [password,setPassword]=useState('');
   const [isFormated,setIsFormated]=useState(false);

 const handleLogin=()=>{
  console.log("hi");
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
