import React from 'react';
  import './App.css';
  import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import LoginPage from "./pages/authPages/login/loginPage.jsx";
import RegisterPage from "./pages/authPages/register/registerPage.jsx";
import Dashboard from "./pages/authPages/dashboard/Dashboard.jsx";
import AlertNotification from './components/AlertNotification.jsx';

function App() {
  return (
    <Router>
       <Routes>
       <Route exact path="/login" element={<LoginPage/>}/> 
        <Route exact path="/register" element={<RegisterPage/>}/>
               <Route exact path="/dashboard" element={<Dashboard/>}/> 
                      <Route exact path="*" element={<Navigate to ="/dashboard"/>}/> 

 

      
 
    </Routes>
        <AlertNotification/>

    </Router>
  );
}

export default App;
